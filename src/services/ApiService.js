// src/services/ApiService.js

const API_URL = import.meta.env.VITE_API_URL;  // Ahora usa la variable de entorno

class ApiService {
    async getState() {
        const res = await fetch(`${API_URL}/state`);
        return res.json();
    }

    async saveState(data) {
        await fetch(`${API_URL}/state`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    // 🔥 Guardar usuario en backend (usado por Login.jsx)
    async saveUser(userId, name) {
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, name })
        });

        if (!res.ok) {
            throw new Error('Error guardando usuario');
        }

        return res.json(); // Devuelve { ok: true } del backend
    }
}

export default new ApiService();

/*
✅ Singleton implícito: exporta siempre la misma instancia
✅ Comunicación limpia con backend
✅ saveUser corregido: usa userId, JSON.stringify, Content-Type y maneja errores
*/
