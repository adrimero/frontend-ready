// src/domain/Identity.js

// ID aleatorio local para identificar sesión si quieres usarlo
export function getUserId() {
    let id = localStorage.getItem('userId');
    if (!id) {
        id = Math.random().toString(36).slice(2);
        localStorage.setItem('userId', id);
    }
    return id;
}

// -----------------------------
// Nombre del usuario actual
export function getUserName() {
    return localStorage.getItem('userName') || '';
}

export function setUserName(name) {
    localStorage.setItem('userName', name);
}

// -----------------------------
// Usuario activo (1 o 2)
export function getActiveUser() {
    return localStorage.getItem('activeUser');
}

export function setActiveUser(id) {
    localStorage.setItem('activeUser', id);
}

/*
FIX / CAMBIO:

1️⃣ getUserId() → id único de sesión (no cambia aunque refresques).
2️⃣ getActiveUser() / setActiveUser(id) → número de usuario 1 o 2, clave para permisos.
3️⃣ getUserName() / setUserName(name) → tu nombre visible.
4️⃣ Diferenciamos "quién eres tú" (activeUser + userName) de "usuario que estás viendo" en la app.
*/
