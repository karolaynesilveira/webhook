interface Webhook {
  evento: string;
  url: string;
}

const webhooks: Webhook[] = [];

export function addWebhook(evento: string, url: string): void {
  webhooks.push({ evento, url });
}

export function getWebhooksByEvent(evento: string): Webhook[] {
  return webhooks.filter(w => w.evento === evento);
}

export function listAllWebhooks(): Webhook[] {
  return webhooks;
}
