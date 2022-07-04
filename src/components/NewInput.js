import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import CurrencyInput from 'react-currency-input-field';

import httpStatus from '../utils/httpStatus';
import UserContext from '../contexts/UserContext';
import Container from './layout/Container';
import Form from './layout/Form';
import InputForm from './layout/InputForm';
import Main from './layout/Main';
import Top from './layout/Top';
import Button from './layout/Button';
import brlStringToNumber from '../utils/brlStringToNumber';

function NewInputForm() {
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [newInput, setNewInput] = useState({
    value: 0,
    description: '',
    type: 'input',
  });

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        `${API_URL}/wallet/new-record`,
        {
          ...newInput,
          value: brlStringToNumber(newInput.value),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        navigate('/');
      })
      .catch(({ response }) => {
        const { status } = response;

        if (status === httpStatus.INTERNAL_SERVER_ERROR) {
          alert(
            'Não foi possível realizar esta operação. Tente novamente mais tarde!'
          );
        }
      });
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <StyledCurrencyInput
        placeholder="Valor"
        intlConfig={{ locale: 'pt-br', currency: 'BRL' }}
        allowNegativeValue={false}
        name="value"
        required
        value={newInput.value}
        onValueChange={(value) =>
          setNewInput({
            ...newInput,
            value,
          })
        }
      />

      <InputForm
        placeholder="Descrição"
        type="text"
        name="description"
        required
        value={newInput.description}
        onChange={(event) =>
          setNewInput({ ...newInput, description: event.target.value })
        }
      />

      <Button type="submit">Salvar entrada</Button>
    </Form>
  );
}

function NewInput() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.token === '') {
      navigate('/sign-in');
    }
  }, []);

  return (
    <Container>
      <Main notCenter>
        <Top>Nova entrada</Top>
        <NewInputForm />
      </Main>
    </Container>
  );
}

const StyledCurrencyInput = styled(CurrencyInput)`
  width: 100%;
  height: 58px;
  background-color: #ffffff;
  border-radius: 5px;
  border: none;
  outline: none;
  padding-left: 15px;
  font-size: 20px;
  color: #000000;
  line-height: 23px;
`;

export default NewInput;
