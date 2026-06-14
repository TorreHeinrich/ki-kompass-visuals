import { activeBranches, comingSoonBranches } from '../data/branches';

export default function BranchSelector({ selectedBranch, onSelectBranch }) {
  return (
    <div className="branch-selector">
      <h3>1. Branche wählen</h3>
      <div className="branch-grid">
        {activeBranches.map((branch) => (
          <button
            key={branch.id}
            className={`branch-card ${selectedBranch?.id === branch.id ? 'selected' : ''}`}
            onClick={() => onSelectBranch(branch)}
            style={{
              '--branch-color': branch.color,
              borderColor: selectedBranch?.id === branch.id ? branch.color : 'transparent',
            }}
          >
            <span className="branch-icon">{branch.icon}</span>
            <span className="branch-name">{branch.name}</span>
          </button>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="coming-soon-section">
        <h4 className="coming-soon-title">🔜 Weitere Branchen folgen</h4>
        <div className="branch-grid coming-soon-grid">
          {comingSoonBranches.map((b) => (
            <div key={b.id} className="branch-card disabled" title="Demnächst verfügbar">
              <span className="branch-icon">{b.icon}</span>
              <span className="branch-name">{b.name}</span>
              <span className="coming-soon-badge">bald</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}