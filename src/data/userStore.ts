export enum UserStatus {
  PENDING = "pendente",
  APPROVED = "aprovado",
  REJECTED = "rejeitado"
}

export interface User {
  id: string;
  nome: string;
  email: string;
  status: UserStatus;
}

const users: Map<string, User> = new Map();

function generateUserId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function createUser(userData: Omit<User, 'id' | 'status' | 'createdAt' | 'updatedAt'>): User {
  if (!userData.nome || !userData.email) {
    throw new Error("Nome e email são obrigatórios");
  }

  const newUser: User = {
    ...userData,
    id: generateUserId(),
    status: UserStatus.PENDING
  };

  users.set(newUser.id, newUser);
  console.log(`[UserStore] Usuário ${newUser.id} criado com status pendente`);
  
  return newUser;
}

export function updateUserStatus(userId: string, newStatus: UserStatus): User | null {
  const user = users.get(userId);
  
  if (!user) {
    console.log(`[UserStore] Usuário ${userId} não encontrado`);
    return null;
  }
  
  const updatedUser: User = {
    ...user,
    status: newStatus
  };
  
  users.set(userId, updatedUser);
  console.log(`[UserStore] Status do usuário ${userId} alterado para ${newStatus}`);
  
  return updatedUser;
}

export function getUserById(userId: string): User | null {
  return users.get(userId) || null;
}

export function getAllUsers(): User[] {
  return Array.from(users.values());
}

export function getUsersByStatus(status: UserStatus): User[] {
  return Array.from(users.values()).filter(user => user.status === status);
}