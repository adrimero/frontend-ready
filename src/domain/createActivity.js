import { ACTIVITY_TYPES } from './activityTypes';

export function createActivity({ text, type, block, options = [] }) {
    return {
        id: crypto.randomUUID(),
        text,
        type,
        block,
        doneBy: {},          // estado binario por usuario
        selectedBy: {},      // SOLO para múltiples
        options: type === ACTIVITY_TYPES.MULTIPLE ? options : [],
        locked: false
    };
}

/*
CAMBIO:
Se unifica el modelo.
Todas las actividades tienen estado binario.
Las múltiples contienen opciones internas, no progreso.
*/
