import React from 'react';

import Container from './layout/Container';
import Main from './layout/Main';
import Top from './layout/Top';
import RecordForm from './shared/RecordForm';

function NewInput() {
  return (
    <Container>
      <Main notCenter>
        <Top>Nova entrada</Top>
        <RecordForm type="input" />
      </Main>
    </Container>
  );
}

export default NewInput;
