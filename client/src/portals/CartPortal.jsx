import styled from 'styled-components';
import { useFetcher, json, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import Portal from './Portal';
import ImageContainer from '../components/utils/ImageContainer';
import { useCart } from '../context/CartContext';
import { ButtonOrange } from '../components/buttons/Button';
import NumberInput from '../components/inputs/NumberInput';
import { axiosPrivate } from '../components/utils/axios';

const ButtonCheckout = styled(ButtonOrange)`
  width: 100%;
`;

const PositionContainer = styled.div`
  position: absolute;
  top: 12rem;
  right: 50%;
  transform: translateX(50%);
  z-index: 999;

  width: calc(100% - calc(var(--padding) * 2));

  @media (min-width: 31.25em) {
    width: 37.7rem;
    right: var(--padding);
    transform: translateX(0);
  }
`;

const CartEl = styled.div`
  padding: 3.2rem 2.8rem;
  background-color: var(--white);

  border-radius: var(--border-radius);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      color: var(--black);
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: 0.1286rem;
      text-transform: uppercase;
    }

    button {
      border: none;
      outline: none;
      background: none;

      color: rgba(0, 0, 0, 0.5);
      font-family: inherit;
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 1.667;
      text-decoration-line: underline;
      cursor: pointer;

      transition: color var(--transition-duration)
        var(--transition-timing-function);

      &:hover {
        color: var(--orange);
      }
    }
  }

  .total {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    line-height: 1.667;
    text-transform: uppercase;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 2.4rem;

    span {
      color: var(--black);
      font-size: 1.8rem;
      font-weight: 700;
    }
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    padding: 3.2rem 0;
  }
`;

const CartItemEl = styled.li`
  display: flex;
  gap: 1.6rem;
  align-items: center;

  position: relative;

  .detail {
    display: flex;
    flex-direction: column;

    p {
      color: var(--black);
      font-weight: 700;
      line-height: 1.667;
    }

    p:last-child {
      opacity: 0.5;
    }
  }
`;

const ButtonDelete = styled.button`
  border: none;
  outline: none;
  background: none;

  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;

  transform: translate(-50%, -50%);

  display: grid;
  width: 2.4rem;
  height: 2.4rem;
  place-items: center;
  background-color: var(--red);
  border-radius: var(--border-radius);

  .icon-cross {
    fill: var(--white);
    width: 50%;
    height: 50%;
  }

  cursor: pointer;
`;

const NumberInputEl = styled(NumberInput)`
  margin-left: auto;

  button {
    padding: 0.7rem 1.5rem;
  }
`;

const CartImage = styled(ImageContainer)`
  button {
    display: none;
  }
`;

function CartItem({ name, price, amount, image, id }) {
  const { editProduct, deleteProduct } = useCart();

  const notifiy = () => {
    deleteProduct(id);
    toast.success('Removed from cart');
  };

  return (
    <CartItemEl>
      <ButtonDelete onClick={notifiy}>
        <svg className="icon icon-cross">
          <use xlinkHref="/assets/symbol-defs.svg#icon-cross"></use>
        </svg>
      </ButtonDelete>
      <CartImage>
        <img src={image} alt={name} />
      </CartImage>

      <div className="detail">
        <p>{name}</p>
        <p>${price}</p>
      </div>

      <NumberInputEl
        amount={amount}
        handleAmount={(newAmount) => editProduct(id, newAmount)}
      />
    </CartItemEl>
  );
}

function Cart() {
  const fetcher = useFetcher();
  const { totalPrice, numItems, products, removeAll, handleClose } = useCart();

  const onSubmit = function (e) {
    e.preventDefault();

    const formData = new FormData();
    products.forEach((product) => {
      formData.append('products', JSON.stringify(product));
    });
    fetcher.submit(formData, { method: 'POST', action: '/checkout' });
  };

  const handleClick = function () {
    if (products.length > 0) {
      removeAll();
      toast.success('All removed');
    }
  };

  return (
    <Portal handleClick={handleClose}>
      <PositionContainer>
        <CartEl>
          <header>
            <p>cart ({numItems})</p>
            <button onClick={handleClick}>Remove all</button>
          </header>
          <form onSubmit={onSubmit}>
            {products.length ? (
              <ul>
                {products.map((product) => {
                  return (
                    <CartItem
                      key={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      amount={product.amount}
                      id={product.id}
                    />
                  );
                })}
              </ul>
            ) : (
              ''
            )}
            <p className="total">
              total <span>${totalPrice}</span>
            </p>
            <ButtonCheckout asEl="button">checkout</ButtonCheckout>
          </form>
        </CartEl>
      </PositionContainer>
    </Portal>
  );
}

export default Cart;

export const action = async function ({ request }) {
  const formData = await request.formData();
  const products = formData.getAll('products');

  const modProducts = products.map((product) => JSON.parse(product));
  try {
    const data = await axiosPrivate({
      url: '/stripe/create-checkout-session',
      method: 'PATCH',
      data: { products: modProducts },
    });

    window.location.href = data.data.url;
    return null;
  } catch (error) {
    if (error.response.status === 400) {
      return error.response.data.error;
    }

    if (error.response.status === 401) {
      return redirect('/login');
    }

    throw json(
      {
        error: error.response.data.error,
      },
      {
        status: error.response.status,
      }
    );
  }
};
