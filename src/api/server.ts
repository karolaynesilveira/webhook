import express from 'express';
import bodyParser from 'body-parser';
import webhookRoutes from './routes/webhookRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import { subscribe } from '../core/eventBus';
import { createEventHandler } from '../core/handlers';
import { USUARIO_APROVADO, USUARIO_CRIADO, USUARIO_REJEITADO } from '../core/events';

const app = express();
app.use(bodyParser.json());

app.use('/webhooks', webhookRoutes);
app.use('/usuarios', usuarioRoutes);

subscribe(USUARIO_CRIADO, createEventHandler(USUARIO_CRIADO));
subscribe(USUARIO_APROVADO, createEventHandler(USUARIO_APROVADO));
subscribe(USUARIO_REJEITADO, createEventHandler(USUARIO_REJEITADO));

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
  console.log('Endpoints disponíveis:');
  console.log('- POST /usuarios - Criar usuário (pendente)');
  console.log('- GET /usuarios - Listar todos os usuários');
  console.log('- GET /usuarios/:id - Buscar usuário por ID');
  console.log('- POST /usuarios/:id/aprovar - Aprovar usuário (dispara webhook)');
  console.log('- POST /usuarios/:id/rejeitar - Rejeitar usuário');
  console.log('- POST /webhooks - Cadastrar webhook');
  console.log('- GET /webhooks - Listar webhooks cadastrados');
});