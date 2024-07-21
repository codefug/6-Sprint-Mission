import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getComments,
  getProduct,
  postProductProductIdComments,
} from "../../../shared/api/api";
import { useEffect, useState } from "react";
import {
  INITIAL_PRODUCT_INFO,
  INITIAL_VALUE,
  INQUIRY_PLACEHOLDER,
} from "../../../shared/constants/constants";
import { ProductInfoSection } from "../../../widgets/ProductInfoSection";
import { Main, MainContent } from "../../../shared/ui/MainContent";
import { Line } from "../../../shared/ui/Line";
import { ProductCommentsSection } from "../../../widgets/ProductCommentsSection/ui/ProductCommentsSection";
import { ItemInput } from "../../../entities/ItemInput";
import { Button } from "../../../shared/ui/Button";
import { FlexContainer } from "../../../shared/ui/Container";
import styled from "styled-components";
import backIcon from "../../../shared/asset/ic_back.png";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface GetProductInfoProps {
  productId: string;
  limit?: number;
}

const schema = z.object({
  inquiry: z.string().min(1, "문의 내용을 입력해주세요"),
});

export const ProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: zodResolver(schema) });

  const { productId } = useParams();
  const navigate = useNavigate();
  if (productId === undefined) {
    alert("없는 상품입니다.");
    navigate("/");
    return;
  }
  const [productInfo, setProductInfo] = useState(INITIAL_PRODUCT_INFO);
  const [dataState, setDataState] = useState(INITIAL_VALUE);

  const [inquirySubmit, setInquirySubmit] = useState(false);

  const getProductInfo = async ({
    productId,
    limit = 3,
  }: GetProductInfoProps) => {
    try {
      setDataState((prevState) => ({
        ...prevState,
        isLoading: true,
        errorMessage: null,
      }));
      const info = await getProduct({ productId });
      const comments = await getComments({ productId, limit });
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        info,
        comments,
      }));
    } catch (error) {
      if (error instanceof Error) {
        setDataState((prevState) => ({
          ...prevState,
          errorMessage: error.message,
        }));
      }
    } finally {
      setDataState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  const onSubmit = async (d: FieldValues) => {
    try {
      const data = await postProductProductIdComments({
        productId: productId,
        content: d.inquiry,
      });
      getProductInfo({ productId });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        throw new Error();
      }
      throw new Error();
    }
  };

  useEffect(() => {
    if (productId) {
      getProductInfo({ productId });
    }
  }, [productId]);

  return (
    <Main>
      <MainContent>
        {dataState?.isLoading && <span>로딩 중입니다.</span>}
        {productInfo?.info && <ProductInfoSection info={productInfo.info} />}
        <Line />
        <FlexContainer
          gap="16px"
          direction="column"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <NewItemInput
            name="Inquiry"
            value="문의하기"
            placeholder={INQUIRY_PLACEHOLDER}
            type="textarea"
            id="inquiry"
            registerData={register("inquiry")}
          />
          <Button
            type="submit"
            classNames={[
              "button--blue",
              "button--small",
              "button--margin-left",
            ]}
            value="등록"
            active={!getValues("inquiry")}
          />
        </FlexContainer>
        {productInfo?.comments?.list && (
          <ProductCommentsSection comments={productInfo.comments.list} />
        )}
        {dataState?.errorMessage && <span>{dataState.errorMessage}</span>}

        <HomeLink to="/">
          <span>목록으로 돌아가기</span>
          <img src={backIcon} />
        </HomeLink>
      </MainContent>
    </Main>
  );
};

const HomeLink = styled(Link).attrs({ className: "styled" })`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  width: 240px;
  height: 48px;
  padding: 12px 71px;
  margin-top: 40px;
  margin-inline: auto;
  border-radius: 40px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  background-color: #3692ff;
`;

const NewItemInput = styled(ItemInput)`
  height: 104px;
  padding: 16px 24px;
  border-radius: 12px;
  text-indent: 0px;
  box-sizing: border-box;
  @media (width<=767px) {
    font-size: 14px;
  }
`;
