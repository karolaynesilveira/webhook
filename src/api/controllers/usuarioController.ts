import { Request, Response } from 'express';
import { dispatch } from '../../core/eventBus';
import { USUARIO_APROVADO, USUARIO_CRIADO, USUARIO_REJEITADO } from '../../core/events';
import { createUser, getUserById, updateUserStatus, UserStatus, getAllUsers } from '../../data/userStore';

export function criarUsuario(req: Request, res: Response): void {
  try {
    const userData = req.body;
    
    if (!userData.nome || !userData.email) {
      res.status(400).json({ erro: 'Nome e email são obrigatórios' });
      return;
    }
    
    const novoUsuario = createUser(userData);
    
    dispatch(USUARIO_CRIADO, userData);

    console.log(`[API] Novo usuário criado com status pendente:`, novoUsuario);
        
    res.status(201).json({ 
      mensagem: 'Usuário criado com status pendente, aguardando aprovação',
      usuario: novoUsuario
    });
  } catch (error) {
    console.error('[API] Erro ao criar usuário:', error);
    res.status(500).json({ erro: 'Erro interno ao processar a requisição' });
  }
}

export function aprovarUsuario(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    
    const usuario = getUserById(id);
    
    if (!usuario) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
      return;
    }
    
    if (usuario.status === UserStatus.APPROVED) {
      res.status(400).json({ erro: 'Usuário já está aprovado' });
      return;
    }
    
    const usuarioAtualizado = updateUserStatus(id, UserStatus.APPROVED);
    
    if (!usuarioAtualizado) {
      res.status(500).json({ erro: 'Erro ao atualizar status do usuário' });
      return;
    }
    
    console.log(`[API] Usuário ${id} aprovado`);
    
    dispatch(USUARIO_APROVADO, usuarioAtualizado);
    
    res.status(200).json({ 
      mensagem: 'Usuário aprovado com sucesso',
      usuario: usuarioAtualizado
    });
  } catch (error) {
    console.error('[API] Erro ao aprovar usuário:', error);
    res.status(500).json({ erro: 'Erro interno ao processar a requisição' });
  }
}

export function rejeitarUsuario(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const { motivo } = req.body;
    
    const usuario = getUserById(id);
    
    if (!usuario) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
      return;
    }
    
    if (usuario.status === UserStatus.REJECTED) {
      res.status(400).json({ erro: 'Usuário já está rejeitado' });
      return;
    }
    
    const usuarioAtualizado = updateUserStatus(id, UserStatus.REJECTED);
    
    if (!usuarioAtualizado) {
      res.status(500).json({ erro: 'Erro ao atualizar status do usuário' });
      return;
    }
    
    console.log(`[API] Usuário ${id} rejeitado`);
    
    dispatch(USUARIO_REJEITADO, { ...usuarioAtualizado, motivo });
    
    res.status(200).json({ 
      mensagem: 'Usuário rejeitado com sucesso',
      usuario: usuarioAtualizado
    });
  } catch (error) {
    console.error('[API] Erro ao rejeitar usuário:', error);
    res.status(500).json({ erro: 'Erro interno ao processar a requisição' });
  }
}

export function listarUsuarios(req: Request, res: Response): void {
  try {
    const usuarios = getAllUsers();
    res.json({ usuarios });
  } catch (error) {
    console.error('[API] Erro ao listar usuários:', error);
    res.status(500).json({ erro: 'Erro interno ao processar a requisição' });
  }
}

export function buscarUsuario(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const usuario = getUserById(id);
    
    if (!usuario) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
      return;
    }
    
    res.json({ usuario });
  } catch (error) {
    console.error('[API] Erro ao buscar usuário:', error);
    res.status(500).json({ erro: 'Erro interno ao processar a requisição' });
  }
}