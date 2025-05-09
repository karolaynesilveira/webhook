import axios from 'axios';
import { getWebhooksByEvent } from '../data/webhookStore';

export function createEventHandler(evento: string) {
  return (data: any) => {
    const destinos = getWebhooksByEvent(evento);
    destinos.forEach((dest) => {
      axios
        .post(dest.url, { evento, dados: data })
        .then(() => console.log(`Webhook enviado para ${dest.url}`))
        .catch((err) => console.error(`Erro ao enviar para ${dest.url}:`, err.message));
    });
  };
}
