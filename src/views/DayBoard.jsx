import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import ScheduleManager from '../domain/ScheduleManager';

// Componentes
import AddActivityForm from '../components/AddActivityForm';
import DayBlock from '../components/DayBlock';
import HistoryView from './HistoryView';
import StatsView from './StatsView';
import AddGoalModal from '../components/AddGoalModal';

export default function DayBoard({ userId }) {
    const [data, setData] = useState(null);
    const [viewUser, setViewUser] = useState(userId);
    const [showHistory, setShowHistory] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showAddGoal, setShowAddGoal] = useState(false);

    const isOwner = userId === viewUser;

    useEffect(() => {
        ApiService.getState().then(setData);
    }, []);

    if (showHistory) return <HistoryView userId={viewUser} onBack={() => setShowHistory(false)} />;
    if (showStats) return <StatsView userId={viewUser} onBack={() => setShowStats(false)} />;
    if (!data) return <div className="loading-state">Cargando experiencia...</div>;

    const routine = data.routines[viewUser];
    const dailyState = data.dailyState[viewUser];
    const getUserName = (id) => data.users[id]?.name || `Usuario ${id}`;

    // --- Lógica (Sin cambios en funcionalidad) ---
    const addActivity = (a) => {
        setData(prev => {
            const next = structuredClone(prev);
            next.routines[userId][a.block].push(a);
            ApiService.saveState(next);
            return next;
        });
    };

    const confirm = (block, activityId, optionId = null) => {
        setData(prev => {
            const next = structuredClone(prev);
            const manager = new ScheduleManager(next, userId);
            const activity = next.routines[viewUser][block].find(a => a.id === activityId);
            manager.confirm(activity, optionId);
            ApiService.saveState(next);
            return next;
        });
    };

    const deleteActivity = (block, id) => {
        setData(prev => {
            const next = structuredClone(prev);
            next.routines[userId][block] = next.routines[userId][block].filter(a => a.id !== id);
            ApiService.saveState(next);
            return next;
        });
    };

    const newDay = () => {
        setData(prev => {
            const next = structuredClone(prev);
            new ScheduleManager(next, userId).newDay();
            ApiService.saveState(next);
            return next;
        });
    };

    const addGoal = (g) => {
        setData(prev => {
            const next = structuredClone(prev);
            const goal = { id: crypto.randomUUID(), ...g, createdAt: Date.now() };
            if (g.shared) next.goals.shared.push(goal);
            else next.goals.individual[userId].push(goal);
            ApiService.saveState(next);
            return next;
        });
    };

    const completeGoal = (goal, shared) => {
        if (!window.confirm(`¿Has completado esta meta?`)) return;
        setData(prev => {
            const next = structuredClone(prev);
            const source = shared ? next.goals.shared : next.goals.individual[userId];
            const index = source.findIndex(g => g.id === goal.id);
            if (index !== -1) {
                const [item] = source.splice(index, 1);
                next.goalsHistory[userId].push({ ...item, completedAt: Date.now() });
            }
            ApiService.saveState(next);
            return next;
        });
    };

    return (
        <div className="ux-dashboard-container">
            {/* Encabezado Principal con Jerarquía Clara */}
            <header className="ux-main-header">
                <div className="ux-header-info">
                    <h1 className="ux-title">Planificación Diaria</h1>
                    <p className="ux-subtitle">Gestionando el flujo de <strong>{getUserName(viewUser)}</strong></p>
                </div>

                <nav className="ux-user-nav">
                    <div className="ux-pill-selector">
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
                </nav>
            </header>

            {/* Barra de Herramientas Glassmorphism */}
            <div className="ux-toolbar">
                <div className="ux-status-indicator">
                    <span className={`ux-dot ${isOwner ? 'is-owner' : 'is-viewer'}`}></span>
                    {isOwner ? 'Modo Edición' : 'Modo Lectura'}
                </div>
                <div className="ux-action-group">
                    <button onClick={() => setShowHistory(true)}>Historial</button>
                    <button onClick={() => setShowStats(true)}>Métricas</button>
                    {isOwner && <button className="ux-btn-primary" onClick={newDay}>Reiniciar Ciclo</button>}
                </div>
            </div>

            <div className="ux-main-layout">
                {/* Columna de Flujo Temporal (70%) */}
                <main className="ux-flow-column">
                    {isOwner && (
                        <section className="ux-form-section">
                            <AddActivityForm onAdd={addActivity} />
                        </section>
                    )}

                    <div className="ux-time-blocks">
                        {['morning', 'afternoon', 'night'].map((time) => (
                            <DayBlock
                                key={time}
                                title={time === 'morning' ? 'Antes' : time === 'afternoon' ? 'Durante' : 'Después'}
                                icon={time === 'morning' ? '🌅' : time === 'afternoon' ? '☀️' : '🌙'}
                                activities={routine[time]}
                                dailyState={dailyState}
                                userId={viewUser}
                                editable={isOwner}
                                onConfirm={(id, opt) => confirm(time, id, opt)}
                                onDelete={id => deleteActivity(time, id)}
                            />
                        ))}
                    </div>
                </main>

                {/* Columna de Metas y Objetivos (30%) */}
                <aside className="ux-side-column">
                    <div className="ux-goals-panel">
                        <header className="ux-panel-header">
                            <h2>Objetivos</h2>
                            {isOwner && <button onClick={() => setShowAddGoal(true)}>+</button>}
                        </header>

                        <div className="ux-goals-list">
                            <label className="ux-group-label">Individuales</label>
                            {data.goals.individual[viewUser].map(goal => (
                                <div key={goal.id} className="ux-goal-card">
                                    <span className="ux-goal-badge">{goal.badge}</span>
                                    <span className="ux-goal-title">{goal.title}</span>
                                    {isOwner && <button onClick={() => completeGoal(goal, false)}>✔</button>}
                                </div>
                            ))}

                            <label className="ux-group-label">Compartidos</label>
                            {data.goals.shared.map(goal => (
                                <div key={goal.id} className="ux-goal-card is-shared">
                                    <span className="ux-goal-badge">{goal.badge}</span>
                                    <span className="ux-goal-title">{goal.title}</span>
                                    {isOwner && <button onClick={() => completeGoal(goal, true)}>✔</button>}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {showAddGoal && (
                <AddGoalModal onAdd={addGoal} onClose={() => setShowAddGoal(false)} />
            )}
        </div>
    );
}