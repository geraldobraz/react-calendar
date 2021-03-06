import styled from 'styled-components';
import { $blue } from '../../styles/colors';

export const Informations = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  height: 10vh;

  h3 {
    font-size: 24px;
  }

  p {
    font-size: 18px;
    color: ${$blue};
  }
`;
