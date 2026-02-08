const KEY = 'rutina_estado';

export async function obtenerEstado() {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);

    return {
        usuarioActual: null,
        usuarios: {},
        morning: [],
        afternoon: [],
        night: []
    };
}

export function guardarEstado(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}
