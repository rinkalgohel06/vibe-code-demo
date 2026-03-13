import Link from 'next/link';
import { getUserProfile } from '@/lib/profile';

export default async function DashboardPage() {
  const { user, profile, role } = await getUserProfile();
  const displayName = profile?.full_name || user?.email || 'there';

  return (
    <section className="content-stack">
      <div>
        <h1>Welcome, {displayName}</h1>
        <p className="muted">
          Role: <span className="role">{role ?? 'pending'}</span>
        </p>
      </div>
      <div className="card-grid">
        <div className="card">
          <h3>Doctor workspace</h3>
          <p className="muted">Manage consults, schedules, and patient notes.</p>
          <Link className="link" href="/doctor">
            Go to doctor tools
          </Link>
        </div>
        <div className="card">
          <h3>Patient workspace</h3>
          <p className="muted">Review care plans, appointments, and instructions.</p>
          <Link className="link" href="/patient">
            Go to patient tools
          </Link>
        </div>
        <div className="card">
          <h3>Profile</h3>
          <p className="muted">Keep your contact details and role up to date.</p>
          <p className="muted">Email: {user?.email}</p>
        </div>
      </div>
    </section>
  );
}
