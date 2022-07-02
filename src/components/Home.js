import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
import httpStatus from '../utils/httpStatus';
import Button from './layout/Button';
import Container from './layout/Container';
import Main from './layout/Main';
import Top from './layout/Top';
import RenderIf from './utilities/RenderIf';

const ZERO = 0;

function CashRecords({ cashFlow = [] }) {
  return (
    <RecordsContainer>
      <RenderIf isTrue={cashFlow.length === ZERO}>
        <NoRecordMessage>Não há registros de entrada ou saída</NoRecordMessage>
      </RenderIf>
    </RecordsContainer>
  );
}

function Home() {
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [wallet, setWallet] = useState({
    balance: 0,
    cashFlow: [],
  });

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }

    axios
      .get(`${API_URL}/wallet`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(({ data }) => {
        setWallet(data);
      })
      .catch(({ response }) => {
        if (response.status === httpStatus.UNAUTHORIZED) {
          navigate('/sign-in');
        }
      });
  }, []);

  return (
    <Container>
      <Main>
        <Top>
          Olá, {user.name}
          <ion-icon name="exit-outline" />
        </Top>
        <CashRecords cashFlow={wallet.cashFlow} />
        <NewRecordButtons>
          <StyledButton>
            <ion-icon name="add-circle-outline" />
            Nova <br /> entrada
          </StyledButton>

          <StyledButton>
            <ion-icon name="remove-circle-outline" />
            Nova <br /> saída
          </StyledButton>
        </NewRecordButtons>
      </Main>
    </Container>
  );
}

const NewRecordButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 114px;
  padding: 10px;
  text-align: left;

  ion-icon {
    font-size: 28px;
  }
`;

const RecordsContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 14px 0;
  background-color: #ffffff;
  border-radius: 5px;
`;

const NoRecordMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #868686;
  text-align: center;
  padding: 0 18%;
`;

export default Home;
