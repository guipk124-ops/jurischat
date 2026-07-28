import { LegalTemplate } from '@/types';

export const legalTemplates: Record<string, LegalTemplate> = {
  trabalhista: {
    area: 'trabalhista',
    displayName: 'Direito Trabalhista',
    description: 'Questões relacionadas a contratos, rescisão, férias, salário e direitos trabalhistas',
    initialMessage: 'Olá! Vou ajudar você com sua questão trabalhista. Primeiro, qual é o seu nome completo?',
    requiredFields: ['nome', 'email', 'telefone', 'tipoQueixa'],
    questions: [
      {
        id: 'nome',
        question: 'Qual é seu nome completo?',
        type: 'text',
        required: true,
      },
      {
        id: 'email',
        question: 'Qual é seu email?',
        type: 'text',
        required: true,
      },
      {
        id: 'telefone',
        question: 'Qual é seu telefone?',
        type: 'text',
        required: true,
      },
      {
        id: 'tipoQueixa',
        question: 'Qual é o tipo de questão trabalhista?',
        type: 'select',
        required: true,
        options: ['Rescisão injusta', 'Não pagamento de salário', 'Férias não remuneradas', 'Assédio moral', 'Acidente de trabalho', 'Outros'],
      },
      {
        id: 'empresaNome',
        question: 'Nome da empresa onde trabalha/trabalhou?',
        type: 'text',
        required: true,
      },
      {
        id: 'periodoTrabalho',
        question: 'Qual foi o período de trabalho? (De e até quando)',
        type: 'text',
        required: true,
      },
      {
        id: 'descricaoFatos',
        question: 'Descreva detalhadamente os fatos da sua reclamação',
        type: 'textarea',
        required: true,
      },
      {
        id: 'documentos',
        question: 'Possui documentos que comprovem a situação? (contrato, contracheques, etc)',
        type: 'checkbox',
        required: false,
        options: ['Contrato de trabalho', 'Contracheques', 'Comunicação com empresa', 'Atestado médico', 'Outros documentos'],
      },
    ],
  },
  familia: {
    area: 'familia',
    displayName: 'Direito de Família',
    description: 'Divórcio, guarda de filhos, pensão alimentícia e demais questões familiares',
    initialMessage: 'Olá! Vou ajudar você com sua questão de direito de família. Qual é o seu nome?',
    requiredFields: ['nome', 'email', 'tipoQueixa'],
    questions: [
      {
        id: 'nome',
        question: 'Qual é seu nome?',
        type: 'text',
        required: true,
      },
      {
        id: 'email',
        question: 'Qual é seu email?',
        type: 'text',
        required: true,
      },
      {
        id: 'tipoQueixa',
        question: 'Qual é a questão familiar?',
        type: 'select',
        required: true,
        options: ['Divórcio', 'Guarda de filhos', 'Pensão alimentícia', 'Reconhecimento de paternidade', 'União estável', 'Outros'],
      },
      {
        id: 'estadoCivil',
        question: 'Qual é seu estado civil atual?',
        type: 'select',
        required: true,
        options: ['Casado', 'Divorciado', 'Solteiro', 'Em união estável'],
      },
      {
        id: 'temFilhos',
        question: 'Possui filhos?',
        type: 'select',
        required: true,
        options: ['Sim', 'Não'],
      },
      {
        id: 'descricaoSituacao',
        question: 'Descreva a situação com detalhes',
        type: 'textarea',
        required: true,
      },
    ],
  },
  consumidor: {
    area: 'consumidor',
    displayName: 'Direito do Consumidor',
    description: 'Produtos/serviços com defeito, devoluções, garantia e proteção ao consumidor',
    initialMessage: 'Olá! Vou ajudar você com sua questão de proteção ao consumidor. Qual é o seu nome?',
    requiredFields: ['nome', 'email', 'tipoProblema'],
    questions: [
      {
        id: 'nome',
        question: 'Qual é seu nome?',
        type: 'text',
        required: true,
      },
      {
        id: 'email',
        question: 'Qual é seu email?',
        type: 'text',
        required: true,
      },
      {
        id: 'tipoProblema',
        question: 'Qual é o problema?',
        type: 'select',
        required: true,
        options: ['Produto com defeito', 'Serviço inadequado', 'Cobrança indevida', 'Não reembolso', 'Publicidade enganosa', 'Outros'],
      },
      {
        id: 'empresa',
        question: 'Qual é a empresa/estabelecimento?',
        type: 'text',
        required: true,
      },
      {
        id: 'dataCompra',
        question: 'Quando foi realizada a compra/contratação?',
        type: 'date',
        required: true,
      },
      {
        id: 'valor',
        question: 'Qual foi o valor?',
        type: 'text',
        required: true,
      },
      {
        id: 'descricaoProblema',
        question: 'Descreva o problema detalhadamente',
        type: 'textarea',
        required: true,
      },
    ],
  },
  civil: {
    area: 'civil',
    displayName: 'Direito Civil',
    description: 'Indenizações, responsabilidade civil, contratos e questões civis gerais',
    initialMessage: 'Olá! Vou ajudar você com sua questão de direito civil. Qual é o seu nome?',
    requiredFields: ['nome', 'email', 'tipoQueixa'],
    questions: [
      {
        id: 'nome',
        question: 'Qual é seu nome?',
        type: 'text',
        required: true,
      },
      {
        id: 'email',
        question: 'Qual é seu email?',
        type: 'text',
        required: true,
      },
      {
        id: 'tipoQueixa',
        question: 'Qual é o tipo de questão civil?',
        type: 'select',
        required: true,
        options: ['Dano moral', 'Dano material', 'Contrato', 'Propriedade', 'Herança', 'Outros'],
      },
      {
        id: 'descricaoFatos',
        question: 'Descreva os fatos que originaram a questão',
        type: 'textarea',
        required: true,
      },
    ],
  },
  imobiliario: {
    area: 'imobiliario',
    displayName: 'Direito Imobiliário',
    description: 'Compra/venda de imóvel, locação, propriedade e questões imobiliárias',
    initialMessage: 'Olá! Vou ajudar você com sua questão imobiliária. Qual é o seu nome?',
    requiredFields: ['nome', 'email', 'tipoQueixa'],
    questions: [
      {
        id: 'nome',
        question: 'Qual é seu nome?',
        type: 'text',
        required: true,
      },
      {
        id: 'email',
        question: 'Qual é seu email?',
        type: 'text',
        required: true,
      },
      {
        id: 'tipoQueixa',
        question: 'Qual é a questão imobiliária?',
        type: 'select',
        required: true,
        options: ['Compra e venda', 'Locação', 'Despejo', 'Propriedade', 'Financiamento', 'Outros'],
      },
      {
        id: 'endereco',
        question: 'Qual é o endereço do imóvel?',
        type: 'text',
        required: true,
      },
      {
        id: 'descricaoSituacao',
        question: 'Descreva a situação detalhadamente',
        type: 'textarea',
        required: true,
      },
    ],
  },
};

export function getLegalTemplate(area: string): LegalTemplate | null {
  return legalTemplates[area.toLowerCase()] || null;
}

export function getAllAreas(): string[] {
  return Object.values(legalTemplates).map((t) => ({
    id: t.area,
    name: t.displayName,
  }));
}