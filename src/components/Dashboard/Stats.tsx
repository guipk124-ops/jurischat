'use client';

import React from 'react';

interface StatsProps {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}

export default function Stats({
  total,
  open,
  inProgress,
  closed,
}: StatsProps) {
  const stats = [
    {
      label: 'Total de Casos',
      value: total,
      bg: 'bg-blue-50',
      color: 'text-blue-600',
      icon: '📋',
    },
    {
      label: 'Abertos',
      value: open,
      bg: 'bg-green-50',
      color: 'text-green-600',
      icon: '🟢',
    },
    {
      label: 'Em Andamento',
      value: inProgress,
      bg: 'bg-yellow-50',
      color: 'text-yellow-600',
      icon: '⏳',
    },
    {
      label: 'Fechados',
      value: closed,
      bg: 'bg-purple-50',
      color: 'text-purple-600',
      icon: '✅',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bg} p-6 rounded-lg border-l-4 ${
            stat.color.replace('text', 'border')
          }`}
        >
          <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
          <div className="flex items-center justify-between">
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <span className="text-3xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}