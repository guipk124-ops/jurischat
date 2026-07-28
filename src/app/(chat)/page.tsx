'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Common/Header';
import ChatBox from '@/components/Chat/ChatBox';
import { getLegalTemplate } from '@/data/legal-templates';
import { ChatMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [caseId, setCaseId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(() => localStorage.getItem('userId') || uuidv4());
  const [conversationHistory, setConversationHistory] = useState<Array<{
    role: string;
    content: string;
  }>>([]);

  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  const handleSelectArea = async (area: string) => {
    setSelectedArea(area);
    const template = getLegalTemplate(area);

    // Create new case
    const response = await fetch('/api/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        legalArea: area,
        title: template?.displayName || area,
      }),
    });

    const data = await response.json();
    if (data.success) {
      setCaseId(data.data.id);
      setMessages([
        {
          id: uuidv4(),
          caseId: data.data.id,
          userId,
          message: template?.initialMessage || 'Como posso ajudá-lo?',
          role: 'ASSISTANT',
          createdAt: new Date(),
        },
      ]);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!caseId || !selectedArea) return;

    setIsLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      caseId,
      userId,
      message,
      role: 'USER',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setConversationHistory((prev) => [
      ...prev,
      { role: 'user', content: message },
    ]);

    try {
      // Get AI response
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          legalArea: selectedArea,
          conversationHistory,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const assistantMessage: ChatMessage = {
          id: uuidv4(),
          caseId,
          userId,
          message: data.response,
          role: 'ASSISTANT',
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setConversationHistory((prev) => [
          ...prev,
          { role: 'assistant', content: data.response },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedArea) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Escolha uma Área Jurídica
            </h2>
            <p className="text-gray-600 text-lg">
              Selecione abaixo a área jurídica que melhor descreve seu caso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'trabalhista', name: '⚖️ Direito Trabalhista' },
              { id: 'familia', name: '👨‍👩‍👧‍👦 Direito de Família' },
              { id: 'consumidor', name: '🛍️ Direito do Consumidor' },
              { id: 'civil', name: '📋 Direito Civil' },
              { id: 'imobiliario', name: '🏠 Direito Imobiliário' },
            ].map((area) => (
              <button
                key={area.id}
                onClick={() => handleSelectArea(area.id)}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all text-left"
              >
                <h3 className="text-xl font-bold text-gray-800">{area.name}</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Clique para começar uma conversa
                </p>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          <button
            onClick={() => setSelectedArea(null)}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Voltar para áreas
          </button>
        </div>
        <ChatBox
          caseId={caseId}
          legalArea={selectedArea}
          onMessageSent={handleSendMessage}
          isLoading={isLoading}
          messages={messages}
        />
      </main>
    </div>
  );
}
