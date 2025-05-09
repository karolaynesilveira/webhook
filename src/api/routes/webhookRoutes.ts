import express, { Request, Response } from 'express';
import { addWebhook, listAllWebhooks } from '../../data/webhookStore';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { evento, url } = req.body;
  if (!evento || !url) {
    res.status(400).json({ erro: 'evento e url são obrigatórios' });
  } else {
    addWebhook(evento, url);
    res.status(201).json({ mensagem: 'Webhook cadastrado com sucesso' });
  }
});

router.get('/', (req: Request, res: Response) => {
  res.json(listAllWebhooks());
});

export default router;
