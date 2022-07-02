import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from './layout/Button';
import Container from './layout/Container';
import Form from './layout/Form';
import InputForm from './layout/InputForm';
import Main from './layout/Main';
import StyledLink from './layout/StyledLink';
import AppName from './shared/AppName';
import UserContext from '../contexts/UserContext';
import httpStatus from '../utils/httpStatus';

function SignInForm() {
  const API_URL = process.env.REACT_APP_API_URL;

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function signIn() {
    axios
      .post(`${API_URL}/sign-in`, form)
      .then(({ data }) => {
        const { name, email, token } = data;
        setUser({ name, email, token });
        navigate('/');
      })
      .catch(({ response }) => {
        if (response.status === httpStatus.UNAUTHORIZED) {
          alert('Email ou senha incorretos. Tente novamente!');
        }
      });
  }

  function handleForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    signIn();
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
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

      <Button type="submit">Entrar</Button>
    </Form>
  );
}

function SignIn() {
  return (
    <Container>
      <Main>
        <AppName />
        <SignInForm />
        <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink>
      </Main>
    </Container>
  );
}

export default SignIn;
