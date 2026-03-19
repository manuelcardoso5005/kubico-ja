// Função para validar email
export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6; // exemplo mínimo de 6 caracteres
};

// Função de login simulada
export const loginWithEmail = async (email: string, password: string) => {
  if (!validateEmail(email)) throw new Error('Email inválido');
  if (!validatePassword(password)) throw new Error('Senha inválida');
  
  // Simula login
  return { success: true, user: { email } };
};

// Login com Google
export const loginWithGoogle = async () => {
  // Simulação
  return { success: true, provider: 'google' };
};