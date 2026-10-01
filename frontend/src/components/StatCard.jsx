export default function StatCard({ icon: Icon, label, value, tone = 'gold' }) {
  return (
    <div className="card stat">
      <span className={`stat-icon ${tone}`}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
    </div>
  );
}
