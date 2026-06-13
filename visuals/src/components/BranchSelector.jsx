import { branches } from '../data/branches';

export default function BranchSelector({ selectedBranch, onSelectBranch }) {
  return (
    <div className="branch-selector">
      <h3>1. Branche wählen</h3>
      <div className="branch-grid">
        {branches.map((branch) => (
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
    </div>
  );
}
