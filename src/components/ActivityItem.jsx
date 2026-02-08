export default function ActivityItem({
    activity,
    dailyState,
    userId,
    onToggle,
    onSelect
}) {
    // Determinamos la categoría temporal para asignar clases de acento (Antes, Durante, Después)
    // Por defecto usaremos una clase base, pero el CSS la pintará según el contexto.
    const activityCategory = activity.category?.toLowerCase() || 'durante'; 

    if (activity.type === 'multiple') {
        const selected = activity.selectedBy?.[userId];
        
        return (
            <div className={`activity-card activity-multiple activity-accent-${activityCategory}`}>
                <div className="activity-content">
                    <h4 className="activity-title">{activity.text}</h4>
                    
                    <div className="activity-options-grid">
                        {activity.options.map(o => (
                            <button
                                key={o.id}
                                className={`activity-option-btn ${selected === o.id ? 'is-selected' : ''}`}
                                disabled={!!selected}
                                onClick={() => onSelect(activity.id, o.id)}
                            >
                                <span className="option-text">{o.text}</span>
                                {selected === o.id && <span className="option-badge">✓</span>}
                            </button>
                        ))}
                    </div>

                    {selected && (
                        <div className="activity-status-footer">
                            <p className="status-confirmed">
                                Seleccionado: <strong>{selected}</strong>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const isChecked = dailyState?.doneBy?.[activity.id]?.[userId] === true;

    return (
        <div className={`activity-card activity-simple activity-accent-${activityCategory} ${isChecked ? 'is-completed' : ''}`}>
            <label className="activity-checkbox-container">
                <div className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        className="activity-input-hidden"
                        checked={isChecked}
                        onChange={() => onToggle(activity.id)}
                    />
                    <div className="custom-checkbox">
                        <div className="checkbox-inner"></div>
                    </div>
                </div>
                
                <div className="activity-info">
                    <span className="activity-text">{activity.text}</span>
                    {activity.points && (
                        <span className="activity-metadata">{activity.points} pts</span>
                    )}
                </div>
            </label>
        </div>
    );
}