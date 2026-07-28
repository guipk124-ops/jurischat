'use client';

import React, { useState } from 'react';
import { Case, CaseStatus, Priority } from '@prisma/client';
import Link from 'next/link';

interface CaseListProps {
  cases: Case[];
  onSelectCase?: (caseId: string) => void;
  isLoading?: boolean;
}

export default function CaseList({
  cases,
  onSelectCase,
  isLoading = false,
}: CaseListProps) {
  const [filterStatus, setFilterStatus] = useState<CaseStatus | 'ALL'>('ALL');

  const filteredCases =
    filterStatus === 'ALL'
      ? cases
      : cases.filter((c) => c.status === filterStatus);

  const getStatusColor = (status: CaseStatus) => {
    const colors: Record<CaseStatus, string> = {
      OPEN: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
      CLOSED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-gray-100 text-gray-800',
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Priority) => {
    const colors: Record<Priority, string> = {
      LOW: 'text-gray-600',
      MEDIUM: 'text-blue-600',
      HIGH: 'text-orange-600',
      URGENT: 'text-red-600',
    };
    return colors[priority];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Filter */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold mb-3">Filtrar por Status</h2>
        <div className="flex gap-2 flex-wrap">
          {['ALL', 'OPEN', 'IN_PROGRESS', 'CLOSED', 'ARCHIVED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as CaseStatus | 'ALL')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status === 'ALL' ? 'Todos' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      <div className="divide-y">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">
            <p>Carregando casos...</p>
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Nenhum caso encontrado</p>
          </div>
        ) : (
          filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectCase?.(caseItem.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{caseItem.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {caseItem.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        getStatusColor(caseItem.status)
                      }`}
                    >
                      {caseItem.status}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        getPriorityColor(caseItem.priority)
                      }`}
                    >
                      {caseItem.priority}
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs text-gray-500">
                    {new Date(caseItem.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}