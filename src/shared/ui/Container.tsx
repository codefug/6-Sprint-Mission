import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || ""};
  justify-content: ${({ justify }) => justify || ""};
  align-items: ${({ align }) => align || ""};
  gap: ${({ gap }) => gap || ""};
`;

export const FlexItem = styled.div`
  flex: ${({ flex }) => flex || ""};
`;
