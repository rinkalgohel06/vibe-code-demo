import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <span className="pill">Telemedicine Access</span>
          <h1>Secure care workflows for doctors and patients</h1>
          <p className="muted">
            Protect consultations, follow-ups, and records with role-aware authentication
            and Supabase-backed sessions.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/auth/sign-in">
              Sign in
            </Link>
            <Link className="btn secondary" href="/auth/sign-up">
              Create account
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="panel-row">
            <h3>Doctors</h3>
            <p className="muted">Review patient history, manage schedules, and document visits.</p>
          </div>
          <div className="panel-row">
            <h3>Patients</h3>
            <p className="muted">Access care plans, appointments, and secure messaging.</p>
          </div>
          <div className="panel-row">
            <h3>Security</h3>
            <p className="muted">Supabase session handling with protected routes.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
