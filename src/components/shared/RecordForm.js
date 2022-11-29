import styled from 'styled-components';
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import UserContext from '../../contexts/UserContext';
import brlStringToNumber from '../../utils/brlStringToNumber';
import Form from '../layout/Form';
import InputForm from '../layout/InputForm';
import Button from '../layout/Button';
import useCreateOrUpdateRecord from '../../hooks/api/useCreateOrUpdateRecord';
import errorToast from '../../utils/errorToast';
import { ToastContainer } from 'react-toastify';
import httpStatus from '../../utils/httpStatus';
import { BeatLoader } from 'react-spinners';

function RecordForm({ type = 'input', id, value = 0, description = '' }) {
  const { createOrUpdateRecord, error, result, status } = useCreateOrUpdateRecord();

  const navigate = useNavigate();

  const { user: { token }, setUser, updateUserBalance } = useContext(UserContext);

  const [record, setRecord] = useState({
    value,
    description,
    type: ['input', 'output'].includes(type) ? type : 'input',
  });

  useEffect(() => {
    if (status === 'success') {
      updateUserBalance(result.data.balance);

      navigate('/');
    }

    if (status === 'error') {
      const { status: errorStatus } = error.response;

      if (errorStatus === httpStatus.UNAUTHORIZED) {
        setUser(null);
        navigate('/sign-in');
      }
    }
  }, [status]);

  function handleSubmit(event) {
    event.preventDefault();

    if (brlStringToNumber(record.value) === 0) {
      errorToast('O valor não pode ser 0.');
      return;
    }

    createOrUpdateRecord({
      ...record,
      value: brlStringToNumber(record.value) * 100,
      token,
      recordId: id
    });
  }

  function isLoading() {
    return status === 'pending';
  }

  return (
    <Form onSubmit={handleSubmit}>
      <ToastContainer />
      <StyledCurrencyInput
        placeholder="Valor"
        intlConfig={{ locale: 'pt-br', currency: 'BRL' }}
        disabled={isLoading()}
        allowNegativeValue={false}
        name="value"
        required
        value={record.value}
        onValueChange={(newValue) =>
          setRecord((prev) => {
            return {
              ...prev,
              value: newValue,
            }
          })
        }
      />

      <InputForm
        placeholder="Descrição"
        type="text"
        name="description"
        required
        disabled={isLoading()}
        value={record.description}
        onChange={(event) =>
          setRecord((prev) => {
            return { ...prev, description: event.target.value };
          })
        }
      />

      <Button type="submit">
        {isLoading() ?
          <BeatLoader color="#ffffff" size={15} />
          :
          <>{id ? 'Atualizar' : 'Salvar'} {type === 'input' ? 'entrada' : 'saída'}</>
        }
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

  :disabled {
    background-color: #c6c6c6;
  }
`;

export default RecordForm;
