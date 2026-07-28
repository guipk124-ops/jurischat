'use client';

export default function TypingIndicator() {
  return (
    <div className="flex gap-1">
      <div
        className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: '0.1s' }}
      />
      <div
        className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: '0.2s' }}
      />
    </div>
  );
}