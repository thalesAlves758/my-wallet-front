import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import Container from '../layout/Container';
import Main from '../layout/Main';
import Top from '../layout/Top';
import RecordForm from '../shared/RecordForm';

function EditRecord({ type = 'input' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.token === '') {
      navigate('/sign-in');
    }
  }, []);

  return (
    <Container>
      <Main notCenter>
        <Top>Editar {type === 'input' ? 'entrada' : 'saída'}</Top>
        <RecordForm
          id={location.state.id}
          value={location.state.value}
          description={location.state.description}
          type={type}
        />
      </Main>
    </Container>
  );
}

export default EditRecord;
