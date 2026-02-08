const channel = new BroadcastChannel('rutina-compartida');

export function subscribe(callback) {
    channel.onmessage = e => callback(e.data);
}

export function publish(data) {
    channel.postMessage(data);
}
