import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import DayBlock from '../components/DayBlock';
import GoalsHistory from '../components/GoalsHistory';

export default function HistoryView({ userId, onBack }) {
    const [data, setData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [viewUser, setViewUser] = useState(userId);
    const [showGoalsHistory, setShowGoalsHistory] = useState(false);

    useEffect(() => {
        ApiService.getState().then(setData);
    }, []);

    if (!data) return <div className="ux-loading-state">Accediendo a los archivos...</div>;

    const dates = Object.keys(data.history || {}).sort().reverse();

    if (!selectedDate && dates.length > 0) {
        setSelectedDate(dates[0]);
        return null;
    }

    const routine = data.routines[viewUser];
    const dailyState = data.history?.[selectedDate]?.[viewUser] || {
        doneBy: {},
        selectedBy: {},
        dayLocked: true
    };

    const goalsHistory = data.goalsHistory?.[viewUser] || [];
    const getUserName = (id) => data.users[id]?.name || `Usuario ${id}`;

    return (
        <div className="ux-history-container">
            {/* CABECERA: Navegación de Retorno */}
            <header className="ux-history-header">
                <button className="ux-btn-back" onClick={onBack}>
                    <span className="ux-back-icon">←</span> Volver al presente
                </button>
                <div className="ux-header-text">
                    <h1 className="ux-title">Archivo Histórico</h1>
                    <p className="ux-subtitle">Explorando memorias de actividad</p>
                </div>
            </header>

            {/* PANEL DE CONTROL: Filtros Glassmorphism */}
            <section className="ux-history-controls">
                <div className="ux-control-card">
                    <div className="ux-filter-group">
                        <label className="ux-label">Fecha del Registro</label>
                        <div className="ux-select-wrapper">
                            <select 
                                className="ux-history-select"
                                value={selectedDate} 
                                onChange={e => setSelectedDate(e.target.value)}
                            >
                                {dates.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="ux-filter-group">
                        <label className="ux-label">Propietario</label>
                        <div className="ux-pill-selector is-small">
                            {Object.keys(data.users).map(id => (
                                <button 
                                    key={id} 
                                    className={`ux-pill-btn ${viewUser === id ? 'is-active' : ''}`}
                                    onClick={() => setViewUser(id)}
                                >
                                    {getUserName(id)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="ux-filter-group">
                        <label className="ux-label">Logros</label>
                        <button className="ux-btn-goals" onClick={() => setShowGoalsHistory(true)}>
                            🎯 Ver Metas Cumplidas
                        </button>
                    </div>
                </div>
            </section>

            {/* STATUS BAR: Contexto del Archivo */}
            <div className="ux-history-context">
                <div className="ux-context-tag">
                    <span className="ux-icon">📑</span>
                    Registros de <strong>{getUserName(viewUser)}</strong>
                </div>
                <div className="ux-context-tag">
                    <span className="ux-icon">📅</span>
                    Periodo: <strong>{selectedDate}</strong>
                </div>
                <div className="ux-lock-indicator">
                    <span className="ux-lock-dot"></span>
                    Archivo Bloqueado (Lectura)
                </div>
            </div>

            {/* GRID DE ACTIVIDADES PASADAS (70/30 Estética) */}
            <main className="ux-main-layout">
                <div className="ux-flow-column">
                    <div className="ux-time-blocks">
                        {['morning', 'afternoon', 'night'].map((time) => (
                            <div key={time} className="ux-history-block-wrapper">
                                <DayBlock
                                    title={time === 'morning' ? 'Antes' : time === 'afternoon' ? 'Durante' : 'Después'}
                                    icon={time === 'morning' ? '🌅' : time === 'afternoon' ? '☀️' : '🌙'}
                                    activities={routine[time]}
                                    dailyState={dailyState}
                                    userId={viewUser}
                                    editable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Columna Lateral para Resumen o Stats Rápidos */}
                <aside className="ux-side-column">
                    <div className="ux-summary-card">
                        <h3>Resumen del Día</h3>
                        <p className="ux-summary-text">
                            En esta fecha, las actividades fueron registradas y selladas. 
                            No se permiten modificaciones en los archivos históricos para preservar la integridad de los datos.
                        </p>
                        <div className="ux-stamp">ARCHIVADO</div>
                    </div>
                </aside>
            </main>

            {/* MODAL DE METAS PASADAS */}
            {showGoalsHistory && (
                <GoalsHistory
                    history={goalsHistory}
                    onClose={() => setShowGoalsHistory(false)}
                />
            )}
        </div>
    );
}