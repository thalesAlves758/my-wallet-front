import axios from 'axios';
import styled from 'styled-components';
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';

import UserContext from '../../contexts/UserContext';
import brlStringToNumber from '../../utils/brlStringToNumber';
import httpStatus from '../../utils/httpStatus';
import Form from '../layout/Form';
import InputForm from '../layout/InputForm';
import Button from '../layout/Button';

function RecordForm({ type = 'input', id, value = 0, description = '' }) {
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [record, setRecord] = useState({
    value,
    description,
    type: ['input', 'output'].includes(type) ? type : 'input',
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (Number(record.value) === 0) {
      alert('O valor não pode ser 0.');
      return;
    }

    axios[id ? 'put' : 'post'](
      `${API_URL}/records${id ? `/${id}` : ''}`,
      {
        ...record,
        value: brlStringToNumber(record.value),
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
        value={record.value}
        onValueChange={(newValue) =>
          setRecord({
            ...record,
            value: newValue,
          })
        }
      />

      <InputForm
        placeholder="Descrição"
        type="text"
        name="description"
        required
        value={record.description}
        onChange={(event) =>
          setRecord({ ...record, description: event.target.value })
        }
      />

      <Button type="submit">
        {id ? 'Atualizar' : 'Salvar'} {type === 'input' ? 'entrada' : 'saída'}
      </Button>
    </Form>
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

export default RecordForm;
