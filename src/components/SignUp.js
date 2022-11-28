import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from './layout/Container';
import Main from './layout/Main';
import InputForm from './layout/InputForm';
import Button from './layout/Button';
import StyledLink from './layout/StyledLink';
import Form from './layout/Form';
import AppName from './shared/AppName';

import useSignUp from '../hooks/api/useSignUp';
import reduceFormToSubmitObject from '../utils/reduceForm';

function SignUpForm() {
  const { signUp, status } = useSignUp();

  const formEl = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      navigate('/sign-in');
    }
  }, [status]);

  function handleSubmit(event) {
    event.preventDefault();

    const newSubmitted = reduceFormToSubmitObject(formEl);

    if (newSubmitted.password !== newSubmitted.confirmPassword) {
      alert('As senhas devem ser iguais!');
      return;
    }

    signUp(newSubmitted);
  }

  return (
    <Form ref={formEl} onSubmit={handleSubmit}>
      <InputForm
        placeholder="Nome"
        name="name"
        type="text"
        required
      />
      <InputForm
        placeholder="E-mail"
        name="email"
        type="email"
        required
      />
      <InputForm
        placeholder="Senha"
        name="password"
        type="password"
        required
      />
      <InputForm
        placeholder="Confirme a senha"
        name="confirmPassword"
        type="password"
        required
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
