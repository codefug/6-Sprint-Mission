import styled from "styled-components";

export const MainContent = styled.main`
  margin-inline: auto;
  margin-bottom: 100px;
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 47px;
  @media (767px<=width<=1199px) {
    gap: 23px;
    margin-inline: 24px;
  }
  @media (375px<=width<=766px) {
    gap: 9px;
    margin-inline: 16px;
  }
`;

export const Main = styled.div`
  display: flex;
  justify-content: center;
`;
