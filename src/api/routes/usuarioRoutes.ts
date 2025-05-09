import express from 'express';
import { 
  criarUsuario, 
  aprovarUsuario, 
  rejeitarUsuario, 
  listarUsuarios, 
  buscarUsuario 
} from '../controllers/usuarioController';

const router = express.Router();

router.post('/', criarUsuario);

router.get('/', listarUsuarios);

router.get('/:id', buscarUsuario);

router.post('/:id/aprovar', aprovarUsuario);

router.post('/:id/rejeitar', rejeitarUsuario);

export default router;