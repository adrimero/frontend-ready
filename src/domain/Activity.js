export default class Activity {
    constructor(raw) {
        Object.assign(this, raw);
    }

    isDone(userId) {
        return !!this.doneBy?.[userId];
    }

    isLocked(userId) {
        return this.isDone(userId) || this.selectedBy?.[userId];
    }
}

/*
CAMBIO:
La lógica de bloqueo sale del UI.
*/