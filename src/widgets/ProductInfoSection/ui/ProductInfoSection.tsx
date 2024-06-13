import styled from "styled-components";
import { TagList } from "../../../entities/TagList";
import { FlexContainer, FlexItem } from "../../../shared/ui/Container";
import { formatPrice } from "../../../shared/util/util";
import { HeartButton } from "../../../shared/ui/Button";
import { Line } from "../../../shared/ui/Line";
import { SpecificProductData } from "@/shared/api/type";

const NewFlexContainer = styled(FlexContainer)`
  @media (width<=767px) {
    flex-direction: column;
  }
`;

const NewTagList = styled(TagList)`
  background: #f3f4f6;
  height: fit-content;
  padding: 6px 16px;
  border-radius: 26px;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
`;

const ProductImage = styled.img`
  width: 486px;
  height: 486px;
  border-radius: 12px;
  @media (width<=1199px) {
    width: 340px;
    height: 340px;
  }
  @media (width<=767px) {
    width: 343px;
    height: 343px;
  }
`;

const ProductName = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 28.64px;
  text-align: left;
`;

const ProductPrice = styled.div`
  font-size: 4rem;
  font-weight: 600;
  line-height: 47.73px;
  text-align: left;
`;

const SubTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  text-align: left;
  color: #4b5563;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  word-break: keep-all;
  text-align: left;
`;

const NewFlexItem = styled(FlexItem)`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

interface ProductInfoSectionProps {
  info: SpecificProductData;
}

export const ProductInfoSection = ({ info }: ProductInfoSectionProps) => {
  const { favoriteCount, images, tags, name, description, price } = info;
  const hashtag = tags.map((v) => `#${v}`);

  return (
    <NewFlexContainer as="section" gap="16px" justify="center">
      <ProductImage src={images.join("")} alt={name + "image"} />
      <FlexContainer direction="column" gap="16px">
        <div>
          <ProductName>{name}</ProductName>
          <ProductPrice>{`${formatPrice(price)}원`}</ProductPrice>
        </div>
        <Line />
        <FlexContainer direction="column" gap="24px">
          <FlexContainer direction="column" gap="8px">
            <SubTitle>상품 소개</SubTitle>
            <Description>{description}</Description>
          </FlexContainer>
          <FlexContainer direction="column" gap="8px">
            <SubTitle>상품 태그</SubTitle>
            <NewTagList tags={hashtag} />
          </FlexContainer>
        </FlexContainer>
        <NewFlexItem flex="1">
          <HeartButton>{favoriteCount}</HeartButton>
        </NewFlexItem>
      </FlexContainer>
    </NewFlexContainer>
  );
};
