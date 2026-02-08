import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

export default function Login({ onLogin }) {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('1');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ApiService.getState().then(data => {
            if (data.users?.[userId]) {
                setName(data.users[userId].name);
            } else {
                setName('');
            }
        });
    }, [userId]);

    async function submit() {
        if (!name.trim()) return;
        setLoading(true);
        await ApiService.saveUser(userId, name.trim());
        onLogin(userId);
    }

    return (
        <div className="ux-login-page">
            {/* Círculos decorativos para el efecto de Glassmorphism de fondo */}
            <div className="ux-bg-blob ux-blob-1"></div>
            <div className="ux-bg-blob ux-blob-2"></div>

            <div className="ux-login-card">
                <header className="ux-login-header">
                    <div className="ux-login-icon-container">
                        <span className="ux-login-icon">🕒</span>
                    </div>
                    <h1 className="ux-title">Bienvenido</h1>
                    <p className="ux-subtitle">Diseña tu jornada, domina tu tiempo</p>
                </header>

                <div className="ux-login-form">
                    <div className="ux-input-group">
                        <label className="ux-label">¿Cómo deberíamos llamarte?</label>
                        <input
                            className="ux-login-input"
                            placeholder="Escribe tu nombre aquí..."
                            value={name}
                            onChange={e => setName(e.target.value)}
                            spellCheck="false"
                        />
                    </div>

                    <div className="ux-input-group">
                        <label className="ux-label">Selecciona tu espacio</label>
                        <div className="ux-select-wrapper">
                            <select 
                                className="ux-login-select" 
                                value={userId} 
                                onChange={e => setUserId(e.target.value)}
                            >
                                <option value="1">👤 Usuario1 </option>
                                <option value="2">👤 Usuario2 </option>
                            </select>
                        </div>
                    </div>

                    <button 
                        className={`ux-btn-login-submit ${loading ? 'is-loading' : ''}`} 
                        onClick={submit}
                        disabled={!name.trim() || loading}
                    >
                        <span className="ux-btn-text">
                            {loading ? 'Preparando tu tablero...' : 'Comenzar Experiencia'}
                        </span>
                        {!loading && <span className="ux-btn-arrow">→</span>}
                    </button>
                </div>
                
                <footer className="ux-login-footer">
                    <p className="ux-sync-text">
                        <span className="ux-sync-dot"></span>
                        Sincronización en tiempo real activa
                    </p>
                </footer>
            </div>
        </div>
    );
}