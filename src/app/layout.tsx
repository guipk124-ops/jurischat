import type { Metadata } from 'next';
import Header from '@/components/Common/Header';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'JurisChat - Chatbot Jurídico',
  description: 'Sistema de atendimento jurídico com IA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
