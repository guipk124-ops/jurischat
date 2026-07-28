'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as IChatMessage } from '@/types';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

interface ChatBoxProps {
  caseId: string;
  legalArea: string;
  onMessageSent?: (message: string) => void;
  isLoading?: boolean;
  messages: IChatMessage[];
}

export default function ChatBox({
  caseId,
  legalArea,
  onMessageSent,
  isLoading = false,
  messages,
}: ChatBoxProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onMessageSent?.(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-bold">{legalArea}</h2>
        <p className="text-sm opacity-90">Caso: {caseId}</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Nenhuma mensagem ainda. Comece a conversa!</p>
          </div>
        ) : (
          messages.map((msg) => <Message key={msg.id} message={msg} />)
        )}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="border-t p-4 bg-gray-50 rounded-b-lg"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
}