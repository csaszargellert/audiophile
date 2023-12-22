import styled from "styled-components";
import { useState } from "react";
import { useRouteLoaderData, useNavigate, useLocation } from "react-router";

import NumberInput from "../inputs/NumberInput";
import ImageContainer from "../utils/ImageContainer";
import { useCart } from "../../context/CartContext";
import { ButtonOrange } from "../buttons/Button";
import { useToast } from "../../context/ToastContext";
import { TOAST_TYPES } from "../utils/constants";

const Price = styled.p`
  color: var(--black);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.1286rem;
  text-transform: uppercase;
`;

const ProductSummaryEl = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  figcaption {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  h3 {
    color: var(--black);
    font-size: 2.8rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    text-transform: uppercase;

    display: flex;
    flex-direction: column;
  }

  p:not(${Price}) {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    line-height: 1.66;
  }

  @media (min-width: 37.5em) {
    flex-direction: row;
    align-items: center;

    figcaption {
      flex: 1 1 50%;
      gap: 3.2rem;
    }

    h3 {
      line-height: 1.1;
    }
  }

  @media (min-width: 56.25em) {
    gap: 8.4rem;
  }

  @media (min-width: 68.75em) {
    gap: 12rem;
  }
`;

const ImageContainerEl = styled(ImageContainer)`
  width: 100%;
  height: 35.2rem;

  @media (min-width: 37.5em) {
    height: 48rem;
    flex: 1 1 40%;
  }

  @media (min-width: 56.25em) {
    flex: 1 1 50%;
  }
`;

const NewProduct = styled.span`
  display: inline-block;
  color: var(--orange);
  font-size: 1.4rem;
  letter-spacing: 1rem;
  text-transform: uppercase;

  @media (min-width: 37.5em) {
    font-size: 1.2rem;
    letter-spacing: 0.8rem;
    margin-bottom: -0.8rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

function ProductSummary({
  image,
  name,
  isNew,
  category,
  description,
  price,
  id,
}) {
  const { userIsAuthenticated } = useRouteLoaderData("root");
  const location = useLocation();
  const navigate = useNavigate();
  const { addProduct } = useCart();
  const { addToast } = useToast();
  const [amount, setAmount] = useState(1);

  const handleClick = function () {
    // if (!userIsAuthenticated)
    //   return navigate("/login", { state: { from: location }, replace: true });

    const product = {
      id,
      image,
      name,
      price,
      amount,
      category,
    };

    addProduct(product);
    addToast({
      message: `Item added`,
      type: TOAST_TYPES.SUCCESS,
    });
    setAmount(1);
  };

  return (
    <ProductSummaryEl>
      <ImageContainerEl>
        <img src={image} alt={name} />
      </ImageContainerEl>
      <figcaption>
        {isNew && <NewProduct>new product</NewProduct>}
        <h3>
          <span>{name}</span>
          <span>{category}</span>
        </h3>
        <p>{description}</p>
        <Price>${price}</Price>
        <ButtonContainer>
          <NumberInput amount={amount} handleAmount={setAmount} />
          <ButtonOrange asEl="button" onClick={handleClick}>
            add to cart
          </ButtonOrange>
        </ButtonContainer>
      </figcaption>
    </ProductSummaryEl>
  );
}

export default ProductSummary;
