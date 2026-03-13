import type { ReactNode } from 'react';
import Link from 'next/link';
import { requireUser } from '@/lib/profile';
import SignOutButton from '@/components/SignOutButton';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  const label = user.email ?? 'Signed in user';

  return (
    <div>
      <header className="top-bar">
        <div className="top-bar__brand">
          <span className="pill">Telemedicine Portal</span>
          <span className="muted">{label}</span>
        </div>
        <nav className="top-bar__nav">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/doctor">Doctor</Link>
          <Link href="/patient">Patient</Link>
          <SignOutButton />
        </nav>
      </header>
      <main className="page-shell">{children}</main>
    </div>
  );
}
