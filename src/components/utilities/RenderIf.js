import React from 'react';

function RenderIf({ isTrue, children }) {
  return <>{isTrue ? children : null}</>;
}

export default RenderIf;
