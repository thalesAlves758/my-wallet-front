import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import Container from '../layout/Container';
import Main from '../layout/Main';
import Top from '../layout/Top';
import RecordForm from '../shared/RecordForm';

function NewOutput() {
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
        <Top>Nova saída</Top>
        <RecordForm type="output" />
      </Main>
    </Container>
  );
}

export default NewOutput;
