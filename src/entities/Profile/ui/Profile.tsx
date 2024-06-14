import styled from "styled-components";
import { FlexContainer } from "../../../shared/ui/Container";
import { getTimeDiffer } from "../../../shared/util/util";
import { useMemo } from "react";
import { SpecificCommentsData } from "@/shared/api/type";

const Nickname = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  text-align: left;
  color: #4b5563;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
`;

const TimeDiffer = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: #9ca3af;
`;

interface ProfileProps {
  writer: SpecificCommentsData["list"][0]["writer"];
  updatedAt: string;
}

export const Profile = ({ writer, updatedAt }: ProfileProps) => {
  const timeDiffer = useMemo(() => getTimeDiffer(updatedAt), [updatedAt]);

  return (
    <>
      <FlexContainer gap="8px">
        <Image src={writer.image} />
        <FlexContainer direction="column" gap="4px">
          <Nickname>{writer.nickname}</Nickname>
          <TimeDiffer>{timeDiffer}</TimeDiffer>
        </FlexContainer>
      </FlexContainer>
    </>
  );
};
