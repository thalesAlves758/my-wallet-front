import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../contexts/UserContext';
import Container from './layout/Container';
import Main from './layout/Main';
import Top from './layout/Top';
import NewRecordForm from './shared/NewRecordForm';

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
        <NewRecordForm type="input" />
      </Main>
    </Container>
  );
}

export default NewInput;
