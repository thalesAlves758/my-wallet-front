import api from './api';

export async function signIn(email, password) {
  const { data, status } = await api.post('/auth/sign-in', { email, password });

  return { data, status };
}

export async function signUp({ name, email, password, confirmPassword }) {
  const { data, status } = await api.post('/auth/sign-up', {
    name,
    email,
    password,
    confirmPassword,
  });

  return { data, status };
}
