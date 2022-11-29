import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';

import Button from '../layout/Button';
import Container from '../layout/Container';
import Form from '../layout/Form';
import InputForm from '../layout/InputForm';
import Main from '../layout/Main';
import StyledLink from '../layout/StyledLink';
import AppName from '../shared/AppName';
import UserContext from '../../contexts/UserContext';
import reduceFormToSubmitObject from '../../utils/reduceForm';
import useSignIn from '../../hooks/api/useSignIn';
import errorToast from '../../utils/errorToast';
import httpStatus from '../../utils/httpStatus';

function SignInForm() {
  const formEl = useRef();

  const { error, result, signIn, status } = useSignIn();

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      setUser(result.data);
      navigate('/');
    }

    if (status === 'error') {
      const { status: statusError } = error.response;

      if (statusError === httpStatus.UNAUTHORIZED) {
        errorToast('Email e/ou senha incorretos!');
      }
    }
  }, [status]);

  function isLoading() {
    return status === 'pending';
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newSubmitted = reduceFormToSubmitObject(formEl);

    signIn(newSubmitted);
  }

  return (
    <Form ref={formEl} onSubmit={handleSubmit}>
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

      <Button type="submit" disabled={isLoading()}>
        {isLoading() ? <BeatLoader color="#ffffff" size={15} /> : 'Entrar'}
      </Button>
    </Form>
  );
}

function SignIn() {
  return (
    <Container>
      <ToastContainer />
      <Main>
        <AppName />
        <SignInForm />
        <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink>
      </Main>
    </Container>
  );
}

export default SignIn;
