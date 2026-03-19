import { RegisterData } from "@/types/register";

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
  if (!validateEmail(email)) throw new Error('login.error_invalid_email');
  if (!validatePassword(password)) throw new Error('login.error_invalid_pass');
  
  // Simula login
  return { success: true, user: { email } };
};

// Login com Google
export const loginWithGoogle = async () => {
  // Simulação
  return { success: true, provider: 'google' };
};



/* VALIDACAO DO CADASTRO */

// Função para cadastrar com email/senha
export async function registerWithEmail(data: RegisterData) {
  // Simulação de requisição HTTP
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.email.includes('@')) {
        reject(new Error('Email inválido'));
      } else if (data.password.length < 6) {
        reject(new Error('Senha muito curta'));
      } else {
        console.log('Cadastro via email:', data);
        resolve({ success: true, user: data });
      }
    }, 1000);
  });
}

// Função para cadastrar/login via Google
export async function registerWithGoogle() {
  // Aqui você chamaria o SDK do Google OAuth ou Firebase
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeUser = {
        name: 'Usuário Google',
        email: 'user@gmail.com',
        role: 'buyer',
      };
      console.log('Cadastro via Google:', fakeUser);
      resolve({ success: true, user: fakeUser });
    }, 1000);
  });
}