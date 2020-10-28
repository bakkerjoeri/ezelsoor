export default new class PubSub {
    constructor() {
        this.events = {};
    }

    on(eventName, handler) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(handler);
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(handler => {
                handler(...args);
            });
        }
    }
}
