import styled from 'styled-components';

const InputForm = styled.input`
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

export default InputForm;
