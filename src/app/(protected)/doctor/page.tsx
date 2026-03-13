import { requireRole } from '@/lib/profile';

export default async function DoctorPage() {
  await requireRole('doctor');

  return (
    <section className="content-stack">
      <h1>Doctor workspace</h1>
      <p className="muted">Manage consults, schedules, and patient notes.</p>
      <div className="card-grid">
        <div className="card">
          <h3>Upcoming consults</h3>
          <p className="muted">Review the next patient sessions and prepare notes.</p>
        </div>
        <div className="card">
          <h3>Patient history</h3>
          <p className="muted">Secure access to longitudinal records and summaries.</p>
        </div>
        <div className="card">
          <h3>Care plans</h3>
          <p className="muted">Coordinate follow-ups and treatment adjustments.</p>
        </div>
      </div>
    </section>
  );
}
