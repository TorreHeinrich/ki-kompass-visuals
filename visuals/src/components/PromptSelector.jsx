export default function PromptSelector({ prompts, selectedPrompt, onSelectPrompt, disabled }) {
  if (!prompts || prompts.length === 0) return null;

  return (
    <div className="prompt-selector">
      <h3>2. Transformation wählen</h3>
      <div className="prompt-grid">
        {prompts.map((p) => (
          <button
            key={p.id}
            className={`prompt-card ${selectedPrompt?.id === p.id ? 'selected' : ''}`}
            onClick={() => onSelectPrompt(p)}
            disabled={disabled}
          >
            <span className="prompt-label">{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
