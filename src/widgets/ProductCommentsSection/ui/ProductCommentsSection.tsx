import styled from "styled-components";
import { Profile } from "../../../entities/Profile";
import { Line } from "../../../shared/ui/Line";
import { FlexContainer } from "../../../shared/ui/Container";

import KebabIcon from "../../../shared/asset/ic_kebab.png";
import inquiryEmtpyImage from "../../../shared/asset/Img_inquiry_empty.png";
import { SpecificCommentsData } from "@/shared/api/type";

interface ProductCommentsSectionProps {
  comments: SpecificCommentsData["list"];
}

export const ProductCommentsSection = ({
  comments,
}: ProductCommentsSectionProps) => {
  return (
    <section>
      {comments.length > 0 ? (
        comments.map((v) => (
          <NewComment key={v.id} direction="column" gap="24px">
            <FlexContainer justify="space-between">
              <ProductComment>{v.content}</ProductComment>
              <EditButton>
                <img src={KebabIcon} />
              </EditButton>
            </FlexContainer>
            <Profile writer={v.writer} updatedAt={v.updatedAt} />
            <Line />
          </NewComment>
        ))
      ) : (
        <InquiryEmpty>
          <InquiryDescription>아직 문의가 없습니다.</InquiryDescription>
        </InquiryEmpty>
      )}
    </section>
  );
};

const NewComment = styled(FlexContainer)`
  padding-bottom: 24px;
`;

const ProductComment = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
`;
const InquiryEmpty = styled.div`
  height: 248px;
  width: 100%;
  background-image: url(${inquiryEmtpyImage});
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #9ca3af;
`;

const EditButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const InquiryDescription = styled.span`
  &::selection {
    background: none;
  }
`;
