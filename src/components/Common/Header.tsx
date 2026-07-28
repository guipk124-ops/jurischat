'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <h1 className="text-2xl font-bold">JurisChat</h1>
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-blue-100 transition-colors">
            Início
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-blue-100 transition-colors"
          >
            Dashboard
          </Link>
          <Link href="/perfil" className="hover:text-blue-100 transition-colors">
            Perfil
          </Link>
        </nav>
      </div>
    </header>
  );
}