import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

import UserContext from '../contexts/UserContext';
import httpStatus from '../utils/httpStatus';
import Button from './layout/Button';
import Container from './layout/Container';
import Main from './layout/Main';
import Top from './layout/Top';
import RenderIf from './utilities/RenderIf';

import toBrl from '../utils/toBrl';
import useGetRecords from '../hooks/api/useGetRecords';
import { ClipLoader } from 'react-spinners';
import useDeleteRecord from '../hooks/api/useDeleteRecord';

const ZERO = 0;

function Record({ id, type, description, value, date, setRecords }) {
  const { deleteRecord: deleteRecordOnDB, error, result, status } = useDeleteRecord();

  const { user: { token }, setUser } = useContext(UserContext);

  useEffect(() => {
    if (status === 'success') {
      removeRecordFromState();

      const { balance: newBalance } = result.data;

      updateUserBalance(newBalance);
    }
  }, [status]);

  function removeRecordFromState() {
    setRecords((prev) => {
      return prev.filter(record => record._id !== id);
    });
  }

  function updateUserBalance(newBalance) {
    setUser((prev) => {
      return { ...prev, balance: newBalance }
    });
  }

  function wantDelete() {
    return window.confirm('Deseja mesmo excluir este registro?');
  }

  function deleteRecord() {
    if (wantDelete()) {
      deleteRecordOnDB({ token, recordId: id });
    }
  }

  return (
    <RecordListItem>
      <div>
        <RecordDate>{dayjs(date).format('DD/MM')}</RecordDate>
        <RecordDescription>
          <Link to="update-record" state={{ id, value, description }}>
            {description}
          </Link>
        </RecordDescription>
      </div>

      <div>
        <RecordValue type={type}>{toBrl(value)}</RecordValue>
        <ion-icon onClick={deleteRecord} name="close-outline" />
      </div>
    </RecordListItem>
  );
}

function CashRecords() {
  const [records, setRecords] = useState([]);

  const { error, getRecords, result, status } = useGetRecords();

  const { user: { balance, token } } = useContext(UserContext);

  useEffect(() => {
    getRecords({ token });
  }, []);

  useEffect(() => {
    if (status === 'success') {
      setRecords(result.data);
    }
  }, [status]);

  function renderRecords() {
    return records.map((record) => (
      <Record
        id={record._id}
        key={record._id}
        type={record.type}
        description={record.description}
        value={record.value}
        date={record.date}
        setRecords={setRecords}
      />
    ));
  }

  return (
    <RecordsContainer>
      {status === 'pending' ?
        <LoadingContainer>
          <ClipLoader color="#8C11BE" />
        </LoadingContainer>
        :
        <>
          {records.length === ZERO ?
            <NoRecordMessage>Não há registros de entrada ou saída</NoRecordMessage>
            :
            <>
              <RecordList>{renderRecords()}</RecordList>

              <WalletBalance>
                SALDO
                <Balance positive={balance >= ZERO}>{toBrl(balance)}</Balance>
              </WalletBalance>
            </>
          }
        </>
      }
    </RecordsContainer>
  );
}

function Home() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  function wantSignOut() {
    return window.confirm('Deseja mesmo sair?');
  }

  function signOut() {
    if (wantSignOut()) {
      setUser(null);

      navigate('/sign-in');
    }
  }

  return (
    <Container>
      <Main>
        <Top>
          Olá, {user.name}
          <ion-icon onClick={signOut} name="exit-outline" />
        </Top>
        <CashRecords />
        <NewRecordButtons>
          <StyledButton onClick={() => navigate('/new-input')}>
            <ion-icon name="add-circle-outline" />
            Nova <br /> entrada
          </StyledButton>

          <StyledButton onClick={() => navigate('/new-output')}>
            <ion-icon name="remove-circle-outline" />
            Nova <br /> saída
          </StyledButton>
        </NewRecordButtons>
      </Main>
    </Container>
  );
}

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  margin: 14px 0;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 24px 12px 0;
  overflow-y: scroll;
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

const RecordList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow-y: scroll;
`;

const RecordListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  line-height: 20px;

  div {
    display: flex;
    align-items: center;
  }

  ion-icon {
    font-size: 20px;
    margin-left: 5px;

    :hover {
      cursor: pointer;
    }
  }
`;

const RecordDate = styled.span`
  color: #c6c6c6;
`;

const RecordDescription = styled.span`
  margin-left: 10px;
  word-break: break-word;

  a {
    color: #000000;
    text-decoration: none;
  }
`;

const RecordValue = styled.span`
  color: ${(props) => (props.type === 'output' ? '#C70000' : '#03AC00')};
`;

const WalletBalance = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 18px 12px 10px;
  color: #000000;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  background-color: #ffffff;
`;

const Balance = styled.span`
  color: ${(props) => (props.positive ? '#03AC00' : '#C70000')};
  font-weight: 400;
`;

export default Home;
