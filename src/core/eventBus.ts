type EventHandler = (data: any) => void;

const listeners: { [eventName: string]: EventHandler[] } = {};

export function subscribe(eventName: string, handler: EventHandler): void {
  if (!listeners[eventName]) listeners[eventName] = [];
  listeners[eventName].push(handler);
}

export function dispatch(eventName: string, data: any): void {
  if (listeners[eventName]) {
    listeners[eventName].forEach(handler => handler(data));
  }
}
