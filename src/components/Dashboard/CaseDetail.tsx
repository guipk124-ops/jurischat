'use client';

import React, { useState } from 'react';
import { Case } from '@prisma/client';
import Link from 'next/link';

interface CaseDetailProps {
  caseData: Case;
  onClose?: () => void;
  onDownloadPdf?: () => void;
}

export default function CaseDetail({
  caseData,
  onClose,
  onDownloadPdf,
}: CaseDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{caseData.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            ID: {caseData.id.substring(0, 8)}...
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onDownloadPdf}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            📥 Baixar PDF
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            ✕ Fechar
          </button>
        </div>
      </div>

      {/* Status and Priority */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Status</p>
          <p className="font-bold text-lg text-blue-600">{caseData.status}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Prioridade</p>
          <p className="font-bold text-lg text-orange-600">{caseData.priority}</p>
        </div>
      </div>

      {/* Description */}
      {caseData.description && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Descrição</h2>
          <p className="text-gray-600 whitespace-pre-wrap">
            {caseData.description}
          </p>
        </div>
      )}

      {/* Client Data */}
      {caseData.clientData && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Dados do Cliente</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(caseData.clientData as Record<string, any>).map(
                  ([key, value]) => (
                    <tr key={key} className="border-b last:border-b-0">
                      <td className="font-semibold text-gray-700 py-2 pr-4">
                        {key}:
                      </td>
                      <td className="text-gray-600 py-2">{String(value)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="text-xs text-gray-500 border-t pt-4">
        <p>Criado em: {new Date(caseData.createdAt).toLocaleString('pt-BR')}</p>
        <p>Atualizado em: {new Date(caseData.updatedAt).toLocaleString('pt-BR')}</p>
      </div>
    </div>
  );
}