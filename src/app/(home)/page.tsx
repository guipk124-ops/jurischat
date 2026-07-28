'use client';

import Link from 'next/link';
import Header from '@/components/Common/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <span className="text-6xl">🏛️</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            JurisChat
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            Seu Assistente Jurídico Inteligente
          </p>
          
          <p className="text-lg opacity-80 mb-12 max-w-2xl mx-auto">
            Atendimento jurídico prático e imediato. Comece uma conversa agora e prepare seu caso para o advogado trabalhar com segurança e eficiência.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/(chat)"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              ▶️ Iniciar Conversa
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-400 transition-colors inline-block"
            >
              📊 Ver Meus Casos
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white text-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Por que usar JurisChat?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Rápido e Prático</h3>
                <p className="text-gray-600">
                  Colete todas as informações do seu caso em minutos através de um chat inteligente.
                </p>
              </div>
              
              <div className="bg-green-50 p-8 rounded-lg">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-2">IA Inteligente</h3>
                <p className="text-gray-600">
                  Assistente jurídico com IA que faz as perguntas certas para entender seu caso.
                </p>
              </div>
              
              <div className="bg-purple-50 p-8 rounded-lg">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-xl font-bold mb-2">Relatórios Automáticos</h3>
                <p className="text-gray-600">
                  Gere relatórios em PDF pronto para o advogado começar a trabalhar imediatamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Areas Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Áreas Jurídicas Atendidas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '⚖️', name: 'Direito Trabalhista' },
                { icon: '👨‍👩‍👧‍👦', name: 'Direito de Família' },
                { icon: '🛒', name: 'Direito do Consumidor' },
                { icon: '📋', name: 'Direito Civil' },
                { icon: '🏠', name: 'Direito Imobiliário' },
                { icon: '💼', name: 'Direito Empresarial' },
              ].map((area) => (
                <div
                  key={area.name}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-4xl mb-2">{area.icon}</div>
                  <p className="font-semibold text-gray-800">{area.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-xl mb-8 opacity-90">
              Inicie uma conversa com nosso assistente jurídico agora mesmo e prepare seu caso para o advogado.
            </p>
            <Link
              href="/(chat)"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Começar Agora →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8 text-center border-t border-blue-700">
        <p className="opacity-80">
          © 2024 JurisChat. Sistema de Atendimento Jurídico com IA.
        </p>
      </footer>
    </div>
  );
}
