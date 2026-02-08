// src/components/GoalsHistory.jsx

export default function GoalsHistory({ history, onClose }) {
    return (
        <div className="modal-overlay history-overlay fade-in">
            <div className="modal-card history-modal glass-morphism">
                <header className="history-header">
                    <div className="header-top">
                        <span className="header-emoji">📜</span>
                        <h3 className="history-title">Historial de Metas</h3>
                        <button className="btn-close-icon" onClick={onClose}>✕</button>
                    </div>
                    <p className="history-subtitle">Un registro de tu constancia y progreso</p>
                </header>

                <div className="history-content-scroll">
                    {history.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">🌱</div>
                            <p>No hay metas completadas todavía. <br/> ¡Tu primer logro te espera!</p>
                        </div>
                    ) : (
                        <div className="goals-grid">
                            {history.map((goal, index) => (
                                <article key={index} className="goal-history-card">
                                    <div className="goal-badge-trophy">
                                        <span className="trophy-icon">🏅</span>
                                        <span className="badge-text">{goal.badge}</span>
                                    </div>
                                    
                                    <div className="goal-details">
                                        <h4 className="goal-title-text">{goal.title}</h4>
                                        
                                        <div className="goal-meta-tags">
                                            {goal.shared && (
                                                <span className="tag shared-tag">
                                                    <span className="tag-icon">🤝</span> Compartida
                                                </span>
                                            )}
                                            <span className="tag date-tag">
                                                ✅ {new Date(goal.completedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                <footer className="history-footer">
                    <button className="btn-primary-block" onClick={onClose}>
                        Volver al tablero
                    </button>
                </footer>
            </div>
        </div>
    );
}