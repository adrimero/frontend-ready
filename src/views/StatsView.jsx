import { useEffect, useState } from 'react';

export default function StatsView({ userId, onBack }) {
    const [stats, setStats] = useState(null);
    const [goalsHistory, setGoalsHistory] = useState([]);

    useEffect(() => {
        // Mantenemos tu lógica de fetch intacta
        fetch(`http://localhost:3000/stats/${userId}`)
            .then(res => res.json())
            .then(setStats);

        fetch(`http://localhost:3000/goals-history/${userId}`)
            .then(res => res.json())
            .then(setGoalsHistory);
    }, [userId]);

    if (!stats) return <div className="ux-loading-state">Calculando métricas de impacto...</div>;

    return (
        <div className="ux-stats-container">
            {/* CABECERA: Navegación y Título Centrado */}
            <header className="ux-stats-header">
                <button className="ux-btn-back-circle" onClick={onBack} aria-label="Volver">
                    ←
                </button>
                <div className="ux-header-content">
                    <h1 className="ux-title">Rendimiento</h1>
                    <p className="ux-subtitle">Análisis de progreso del Usuario {userId}</p>
                </div>
            </header>

            {/* SECCIÓN 1: Tarjetas de Impacto (Métricas Clave) */}
            <section className="ux-metrics-grid">
                <div className="ux-metric-card is-streak">
                    <div className="ux-metric-icon">🔥</div>
                    <div className="ux-metric-data">
                        <span className="ux-metric-value">{stats.currentStreak}</span>
                        <span className="ux-metric-label">Racha Actual</span>
                    </div>
                </div>

                <div className="ux-metric-card is-rate">
                    <div className="ux-metric-icon">📊</div>
                    <div className="ux-metric-data">
                        <span className="ux-metric-value">{stats.completionRate}%</span>
                        <span className="ux-metric-label">Tasa de Éxito</span>
                    </div>
                </div>

                <div className="ux-metric-card">
                    <div className="ux-metric-icon">📅</div>
                    <div className="ux-metric-data">
                        <span className="ux-metric-value">{stats.validDays}</span>
                        <span className="ux-metric-label">Días Logrados</span>
                    </div>
                </div>

                <div className="ux-metric-card is-total">
                    <div className="ux-metric-icon">🏆</div>
                    <div className="ux-metric-data">
                        <span className="ux-metric-value">{goalsHistory.length}</span>
                        <span className="ux-metric-label">Metas Totales</span>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 2: Salón de la Fama (Visualización de Logros) */}
            <section className="ux-hall-of-fame">
                <div className="ux-section-header">
                    <h2 className="ux-section-title">🏅 Salón de la Fama</h2>
                    <div className="ux-divider"></div>
                </div>

                {goalsHistory.length === 0 ? (
                    <div className="ux-empty-state">
                        <div className="ux-empty-icon">✨</div>
                        <p>El camino hacia la excelencia comienza con la primera meta.</p>
                    </div>
                ) : (
                    <div className="ux-trophy-grid">
                        {goalsHistory.map((goal, index) => (
                            <div key={index} className={`ux-trophy-card ${goal.shared ? 'is-shared-gold' : ''}`}>
                                <div className="ux-trophy-badge-container">
                                    <span className="ux-trophy-emoji">{goal.badge}</span>
                                </div>
                                <div className="ux-trophy-info">
                                    <h4 className="ux-trophy-name">{goal.title}</h4>
                                    <div className="ux-trophy-meta">
                                        {goal.shared && <span className="ux-shared-pill">🤝 Co-op</span>}
                                        <time className="ux-trophy-date">
                                            {new Date(goal.completedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                        </time>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* FOOTER: Acción de Cierre */}
            <footer className="ux-stats-footer">
                <button className="ux-btn-return-huge" onClick={onBack}>
                    Volver al Tablero Principal
                </button>
            </footer>
        </div>
    );
}