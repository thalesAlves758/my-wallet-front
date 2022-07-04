import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.notCenter ? 'flex-start' : 'center')};
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Main;
