import { useState } from 'react';
import { ACTIVITY_TYPES } from '../domain/activityTypes';
import { createActivity } from '../domain/createActivity';

export default function AddActivityForm({ onAdd }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [type, setType] = useState(null);
    const [block, setBlock] = useState('morning');
    const [text, setText] = useState('');
    const [options, setOptions] = useState([]);
    const [optionText, setOptionText] = useState('');

    function reset() {
        setStep(1);
        setType(null);
        setText('');
        setOptions([]);
        setOptionText('');
        setIsOpen(false);
    }

    function submit() {
        if (!text.trim()) return;
        if (type === ACTIVITY_TYPES.MULTIPLE && options.length < 1) return;
        onAdd(createActivity({ text, type, block, options }));
        reset();
    }

    return (
        <div className="add-activity-container">
            {!isOpen ? (
                <button className="btn-trigger-main" onClick={() => setIsOpen(true)}>
                    <span className="btn-icon">+</span>
                    <span className="btn-text">Nueva actividad</span>
                </button>
            ) : (
                <div className="form-wizard-overlay">
                    <div className="form-wizard-card">
                        <header className="wizard-header">
                            <button className="btn-back" onClick={reset}>✕</button>
                            <div className="step-indicator">Paso {step} de 2</div>
                        </header>

                        {step === 1 && (
                            <div className="wizard-step fade-in">
                                <h2 className="wizard-title">¿Qué tipo de actividad deseas agregar?</h2>
                                <div className="type-selector-grid">
                                    <button className={`type-card ${type === ACTIVITY_TYPES.MANDATORY ? 'active' : ''}`} 
                                            onClick={() => { setType(ACTIVITY_TYPES.MANDATORY); setStep(2); }}>
                                        <span className="type-icon">🧱</span>
                                        <span className="type-label">Obligatoria</span>
                                    </button>
                                    <button className={`type-card ${type === ACTIVITY_TYPES.OPTIONAL ? 'active' : ''}`} 
                                            onClick={() => { setType(ACTIVITY_TYPES.OPTIONAL); setStep(2); }}>
                                        <span className="type-icon">🌱</span>
                                        <span className="type-label">Opcional</span>
                                    </button>
                                    <button className={`type-card ${type === ACTIVITY_TYPES.MULTIPLE ? 'active' : ''}`} 
                                            onClick={() => { setType(ACTIVITY_TYPES.MULTIPLE); setStep(2); }}>
                                        <span className="type-icon">🧩</span>
                                        <span className="type-label">Múltiple</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="wizard-step fade-in">
                                <h2 className="wizard-title">Detalles de la actividad</h2>
                                
                                <div className="input-group">
                                    <label className="input-label">Momento del día</label>
                                    <div className="custom-select-wrapper">
                                        <select className="form-input" value={block} onChange={e => setBlock(e.target.value)}>
                                            <option value="morning">Mañana (Antes)</option>
                                            <option value="afternoon">Tarde (Durante)</option>
                                            <option value="night">Noche (Después)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Nombre de la actividad</label>
                                    <input
                                        className="form-input"
                                        placeholder="Ej: Meditación matutina..."
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                    />
                                </div>

                                {type === ACTIVITY_TYPES.MULTIPLE && (
                                    <div className="multiple-options-section">
                                        <label className="input-label">Opciones disponibles</label>
                                        <div className="options-chip-container">
                                            {options.map((o, i) => (
                                                <div key={i} className="option-chip">{o.text}</div>
                                            ))}
                                        </div>
                                        <div className="option-input-wrapper">
                                            <input
                                                className="form-input-inline"
                                                placeholder="Nueva opción..."
                                                value={optionText}
                                                onChange={e => setOptionText(e.target.value)}
                                            />
                                            <button className="btn-add-option" onClick={() => {
                                                if (!optionText.trim()) return;
                                                setOptions([...options, { id: crypto.randomUUID(), text: optionText }]);
                                                setOptionText('');
                                            }}>+</button>
                                        </div>
                                    </div>
                                )}

                                <footer className="wizard-footer">
                                    <button className="btn-secondary" onClick={() => setStep(1)}>Atrás</button>
                                    <button className="btn-primary" onClick={submit}>Crear actividad</button>
                                </footer>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}