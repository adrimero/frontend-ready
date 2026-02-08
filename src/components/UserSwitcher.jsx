export default function UserSwitcher({ users, current, onSelect, onRename }) {
    return (
        <div className="user-switcher-container">
            <h4 className="switcher-label">Usuarios en la sesión</h4>
            <div className="users-flex-wrapper">
                {Object.entries(users).map(([id, u]) => {
                    const isActive = id === current;
                    
                    return (
                        <div 
                            key={id} 
                            className={`user-profile-card ${isActive ? 'is-active' : ''}`}
                        >
                            <div className="user-avatar">
                                {u.nombre ? u.nombre.charAt(0).toUpperCase() : '?'}
                            </div>
                            
                            <div className="user-info-actions">
                                <input 
                                    className="user-name-input"
                                    value={u.nombre} 
                                    onChange={e => onRename(id, e.target.value)}
                                    placeholder="Nombre..."
                                    title="Haz clic para renombrar"
                                />
                                
                                {!isActive && (
                                    <button 
                                        className="btn-select-user" 
                                        onClick={() => onSelect(id)}
                                    >
                                        Cambiar a este perfil
                                    </button>
                                )}
                                
                                {isActive && (
                                    <span className="active-badge">Sesión activa</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}