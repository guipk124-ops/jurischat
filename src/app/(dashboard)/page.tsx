'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Common/Header';
import CaseList from '@/components/Dashboard/CaseList';
import CaseDetail from '@/components/Dashboard/CaseDetail';
import Stats from '@/components/Dashboard/Stats';
import { Case } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export default function DashboardPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId] = useState(() => localStorage.getItem('userId') || uuidv4());

  useEffect(() => {
    loadCases();
  }, [userId]);

  const loadCases = async () => {
    try {
      const response = await fetch(`/api/cases?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setCases(data.data);
      }
    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCase = (caseId: string) => {
    const selected = cases.find((c) => c.id === caseId);
    setSelectedCase(selected || null);
  };

  const handleDownloadPdf = async () => {
    if (!selectedCase) return;

    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: selectedCase.id }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `caso_${selectedCase.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const stats = {
    total: cases.length,
    open: cases.filter((c) => c.status === 'OPEN').length,
    inProgress: cases.filter((c) => c.status === 'IN_PROGRESS').length,
    closed: cases.filter((c) => c.status === 'CLOSED').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="mb-8">
          <Stats
            total={stats.total}
            open={stats.open}
            inProgress={stats.inProgress}
            closed={stats.closed}
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CaseList
              cases={cases}
              onSelectCase={handleSelectCase}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-2">
            {selectedCase ? (
              <CaseDetail
                caseData={selectedCase}
                onClose={() => setSelectedCase(null)}
                onDownloadPdf={handleDownloadPdf}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">
                  Selecione um caso para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
