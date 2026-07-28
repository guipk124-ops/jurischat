'use client';

import React from 'react';
import { ChatMessage } from '@/types';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  message: ChatMessage;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'USER';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap break-words">
          <ReactMarkdown>{message.message}</ReactMarkdown>
        </div>
        {message.response && (
          <div
            className={`mt-2 text-xs opacity-70 ${
              isUser ? 'text-blue-100' : 'text-gray-600'
            }`}
          >
            {new Date(message.createdAt).toLocaleTimeString('pt-BR')}
          </div>
        )}
      </div>
    </div>
  );
}