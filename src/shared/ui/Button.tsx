import styled from "styled-components";
import "./Button.scss";
import Heart from "../asset/IconHeart.png";
import { FlexContainer } from "./Container";
import { ButtonProps } from "./type";

/**
 * props의 classNames이라는 Array 안에 className들을 넣으면 해당 css가 작동한다.
 * @param {Object}{Array} classNames
 * @param {Object}{string} value
 * @returns blueButton
 */
export const Button = ({
  classNames,
  value,
  active = true,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={!active}
      onClick={onClick}
      className={"button " + classNames.join(" ")}
    >
      {value}
    </button>
  );
};

const HeartIcon = styled.img`
  height: 32px;
  width: 32px;
  @media (width<=767px) {
    height: 24px;
    width: 24px;
  }
`;

const HeartDescription = styled.span`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #6b7280;
`;

const NewFlexContainer = styled(FlexContainer)`
  padding: 4px 12px;
  border-radius: 35px;
  border: 1px solid #e5e7eb;
  width: fit-content;
  flex: 0;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

export const HeartButton = ({ children }: React.PropsWithChildren) => {
  return (
    <NewFlexContainer as="button" type="button" align="center" gap="4px">
      <HeartIcon src={Heart} />
      <HeartDescription>{children}</HeartDescription>
    </NewFlexContainer>
  );
};
