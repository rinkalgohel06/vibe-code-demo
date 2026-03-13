import { requireRole } from '@/lib/profile';

export default async function PatientPage() {
  await requireRole('patient');

  return (
    <section className="content-stack">
      <h1>Patient workspace</h1>
      <p className="muted">Stay on top of appointments and treatment plans.</p>
      <div className="card-grid">
        <div className="card">
          <h3>Next appointment</h3>
          <p className="muted">Prepare questions and review visit details.</p>
        </div>
        <div className="card">
          <h3>Care plan</h3>
          <p className="muted">Track progress, medications, and instructions.</p>
        </div>
        <div className="card">
          <h3>Messages</h3>
          <p className="muted">Securely follow up with your care team.</p>
        </div>
      </div>
    </section>
  );
}
