export default function DayBlock({
    title,
    icon,
    activities,
    dailyState,
    userId,
    editable = true,
    onConfirm,
    onDelete
}) {
    // Clase semántica basada en el título para el color de acento
    const blockType = title.toLowerCase().includes('mañana') ? 'antes' : 
                      title.toLowerCase().includes('noche') ? 'despues' : 'durante';

    return (
        <section className={`day-block-container block-accent-${blockType}`}>
            <header className="block-header">
                <span className="block-icon">{icon}</span>
                <h3 className="block-title">{title}</h3>
                <span className="block-count">{activities.length} actividades</span>
            </header>

            <div className="activities-list">
                {activities.map(a => {
                    const done = !!dailyState?.doneBy?.[a.id]?.[userId];
                    const selectedOptionId = dailyState?.selectedBy?.[a.id]?.[userId];
                    const selectedOption = a.type === 'multiple'
                        ? a.options.find(opt => opt.id === selectedOptionId)
                        : null;

                    return (
                        <article key={a.id} className={`activity-entry ${done ? 'is-done' : ''}`}>
                            <div className="activity-main-info">
                                <div className="activity-text-wrapper">
                                    <h4 className="activity-entry-text">{a.text}</h4>
                                    {done && (
                                        <div className="status-badge fade-in">
                                            <span className="check-icon">✓</span> 
                                            {selectedOption ? `Realizado: ${selectedOption.text}` : 'Realizado'}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="activity-actions">
                                    {editable && (
                                        <button 
                                            className="btn-delete-small" 
                                            onClick={() => onDelete(a.id)}
                                            title="Eliminar"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {!done && editable && (
                                <div className="activity-interaction-area fade-in">
                                    {a.type === 'multiple' ? (
                                        <div className="options-grid-mini">
                                            {a.options.map(opt => (
                                                <button
                                                    key={opt.id}
                                                    className="btn-option-mini"
                                                    onClick={() => {
                                                        const ok = confirm(`¿Confirmas que realizaste: "${opt.text}"?`);
                                                        if (ok) onConfirm(a.id, opt.id);
                                                    }}
                                                >
                                                    {opt.text}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <button
                                            className="btn-confirm-action"
                                            onClick={() => {
                                                const ok = confirm('¿Confirmas que realizaste esta actividad?');
                                                if (ok) onConfirm(a.id);
                                            }}
                                        >
                                            Marcar como hecha
                                        </button>
                                    )}
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}