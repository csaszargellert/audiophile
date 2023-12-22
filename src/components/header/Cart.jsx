import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { useCart } from "../../context/CartContext";

const pulsate = keyframes`
  0% {
    transform: scale(0.7);
  }

  50% {
    transform: scale(1.5);
  }

  100% {  
    transform: scale(1);
  }
`;

const CartLink = styled.button`
  border: none;
  outline: none;
  background: none;

  display: flex;
  cursor: pointer;
  position: relative;

  &.pulsate {
    animation: ${pulsate} 300ms var(--transition-timing-function);
  }
`;

const NumberDisplay = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  font-weight: 700;
  /* height: 1rem; */
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(75%, -50%);
  background-color: var(--orange);
  color: var(--white);
`;

function Cart() {
  const { handleOpen, totalPrice, totalNumberOfItems } = useCart();
  const [isPulsating, setIsPulsating] = useState(false);

  useEffect(() => {
    if (totalPrice) {
      setIsPulsating(true);
    }
  }, [totalPrice]);

  const handlePulsateAnimationEnd = function () {
    setIsPulsating(false);
  };

  return (
    <CartLink
      onClick={handleOpen}
      className={isPulsating ? "pulsate" : ""}
      onAnimationEnd={handlePulsateAnimationEnd}
    >
      <NumberDisplay>{totalNumberOfItems}</NumberDisplay>
      <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </svg>
    </CartLink>
  );
}

export default Cart;
