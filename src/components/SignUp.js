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
import { BeatLoader } from 'react-spinners';
import errorToast from '../utils/errorToast';
import { ToastContainer } from 'react-toastify';

function SignUpForm() {
  const { signUp, status, error } = useSignUp();

  const formEl = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      navigate('/sign-in');
    }

    if (status === 'error') {
      const { status: errorStatus } = error.response;

      if (errorStatus === 409) {
        errorToast('Email já em uso!');
      }
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

  function isLoading() {
    return status === 'pending';
  }

  return (
    <Form ref={formEl} onSubmit={handleSubmit}>
      <InputForm
        placeholder="Nome"
        name="name"
        type="text"
        required
        disabled={isLoading()}
      />
      <InputForm
        placeholder="E-mail"
        name="email"
        type="email"
        required
        disabled={isLoading()}
      />
      <InputForm
        placeholder="Senha"
        name="password"
        type="password"
        required
        disabled={isLoading()}
      />
      <InputForm
        placeholder="Confirme a senha"
        name="confirmPassword"
        type="password"
        required
        disabled={isLoading()}
      />

      <Button type="submit" disabled={isLoading()}>
        {isLoading() ? <BeatLoader color="#ffffff" size={15} /> : 'Cadastrar'}
      </Button>
    </Form>
  );
}

function SignUp() {
  return (
    <Container>
      <ToastContainer />
      <Main>
        <AppName />
        <SignUpForm />
        <StyledLink to="/sign-in">Já tem uma conta? Entre agora!</StyledLink>
      </Main>
    </Container>
  );
}

export default SignUp;
