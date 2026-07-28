import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateChatResponse(
  userMessage: string,
  legalArea: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  const systemPrompt = `Você é um assistente jurídico especializado em ${legalArea}. 
Sua função é fazer perguntas claras e objetivas ao cliente para entender melhor seu caso.
Seja amigável, profissional e respeitoso.
Nunca dê parecer jurídico definitivo, apenas colete informações.
Faça uma pergunta por vez.
Se o cliente responder algo fora do contexto, redirecione gentilmente.`;

  const messages: OpenAI.Messages.MessageParam[] = [
    ...conversationHistory.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    {
      role: 'user',
      content: userMessage,
    },
  ];

  try {
    const response = await openai.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    return 'Desculpe, ocorreu um erro ao processar sua mensagem.';
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw new Error('Falha ao gerar resposta do chat');
  }
}

export async function generateCaseSummary(
  caseData: Record<string, any>,
  chatHistory: Array<{ message: string; response: string }>
): Promise<string> {
  const conversationText = chatHistory.map((m) => `Cliente: ${m.message}\nAssistente: ${m.response}`).join('\n\n');

  const prompt = `Baseado nas seguintes informações coletadas sobre um caso jurídico, gere um resumo executivo profissional:

Dados do Cliente: ${JSON.stringify(caseData, null, 2)}

Histórico da Conversa:
${conversationText}

Gere um sumário em markdown que inclua:
1. Resumo dos fatos
2. Questões principais
3. Informações relevantes coletadas
4. Próximas ações sugeridas`;

  try {
    const response = await openai.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    return 'Erro ao gerar sumário';
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Falha ao gerar sumário do caso');
  }
}