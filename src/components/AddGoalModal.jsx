import { useState } from 'react';

export default function AddGoalModal({ onAdd, onClose }) {
    const [title, setTitle] = useState('');
    const [badge, setBadge] = useState('');
    const [shared, setShared] = useState(false);

    function submit(e) {
        e.preventDefault();
        if (!title.trim() || !badge.trim()) {
            return; // El CSS manejará visualmente el estado de deshabilitado
        }

        onAdd({
            title: title.trim(),
            badge: badge.trim(),
            shared
        });
        onClose();
    }

    return (
        <div className="modal-overlay fade-in">
            <div className="modal-card glass-morphism">
                <header className="modal-header">
                    <div className="header-icon">✨</div>
                    <h3 className="modal-title">Nueva Meta</h3>
                    <p className="modal-subtitle">Define un nuevo hito para tu progreso</p>
                </header>

                <form className="modal-form" onSubmit={submit}>
                    <div className="input-group">
                        <label className="input-label">¿Cuál es tu objetivo?</label>
                        <input
                            className="modal-input"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Ej: Entrenar 30 min"
                            autoFocus
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Título del Badge</label>
                        <div className="badge-input-wrapper">
                            <span className="badge-prefix">🏷️</span>
                            <input
                                className="modal-input-badge"
                                value={badge}
                                onChange={e => setBadge(e.target.value)}
                                placeholder="Ej: Atleta"
                            />
                        </div>
                    </div>

                    <div className="switch-group">
                        <div className="switch-info">
                            <span className="switch-title">Meta compartida</span>
                            <span className="switch-description">Visible para otros usuarios</span>
                        </div>
                        <label className="ui-switch">
                            <input
                                type="checkbox"
                                checked={shared}
                                onChange={e => setShared(e.target.checked)}
                            />
                            <div className="switch-slider"></div>
                        </label>
                    </div>

                    <footer className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn-save" 
                            disabled={!title.trim() || !badge.trim()}
                        >
                            Guardar Meta
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}