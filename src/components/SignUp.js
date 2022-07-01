import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from './layout/Container';
import Main from './layout/Main';
import InputForm from './layout/InputForm';
import Button from './layout/Button';
import StyledLink from './layout/StyledLink';
import Form from './layout/Form';
import AppName from './shared/AppName';

import httpStatus from '../utils/httpStatus';

function SignUpForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function signUp() {
    axios
      .post('http://127.0.0.1:5000/sign-up', form)
      .then(() => {
        navigate('/sign-in');
      })
      .catch(({ response }) => {
        if (response.status === httpStatus.CONFLICT) {
          alert('Já existe um usuário com este e-mail!');
        }
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('As senhas devem ser iguais!');
      return;
    }

    signUp();
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <InputForm
        placeholder="Nome"
        name="name"
        type="text"
        required
        value={form.name}
        onChange={(event) => handleForm(event)}
      />
      <InputForm
        placeholder="E-mail"
        name="email"
        type="email"
        required
        value={form.email}
        onChange={(event) => handleForm(event)}
      />
      <InputForm
        placeholder="Senha"
        name="password"
        type="password"
        required
        value={form.password}
        onChange={(event) => handleForm(event)}
      />
      <InputForm
        placeholder="Confirme a senha"
        name="confirmPassword"
        type="password"
        required
        value={form.confirmPassword}
        onChange={(event) => handleForm(event)}
      />

      <Button type="submit">Cadastrar</Button>
    </Form>
  );
}

function SignUp() {
  return (
    <Container>
      <Main>
        <AppName />
        <SignUpForm />
        <StyledLink to="/sign-in">Já tem uma conta? Entre agora!</StyledLink>
      </Main>
    </Container>
  );
}

export default SignUp;
