import styled from "styled-components";
import { FlexContainerProps, FlexItemProps } from "./type";

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || ""};
  justify-content: ${({ justify }) => justify || ""};
  align-items: ${({ align }) => align || ""};
  gap: ${({ gap }) => gap || ""};
`;

export const FlexItem = styled.div<FlexItemProps>`
  flex: ${({ flex }) => flex || ""};
`;
