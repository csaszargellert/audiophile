import styled from 'styled-components';

import { ButtonBlack } from '../buttons/Button';
import ImageContainer from '../utils/ImageContainer';

const ZElementHTML = styled.div`
  --height: 20rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (min-width: 37.5em) {
    flex-direction: row;
    gap: 1.2rem;
  }
`;

const ImageContainerEl = styled(ImageContainer)`
  width: 100%;
  height: calc(var(--height) * 2);

  @media (min-width: 37.5em) {
    height: calc(var(--height) * 1.6);
    flex: 1 0 50%;
  }

  @media (min-width: 68.75em) {
    height: calc(var(--height) * 2);
    flex: 1 0 30%;
  }
`;

const ProductDetail = styled.div`
  width: 100%;
  height: var(--height);
  padding: 4.2rem 2.4rem;

  background-color: var(--orange);
  border-radius: var(--border-radius);

  div {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    align-items: flex-start;
  }

  p {
    color: var(--black);
    font-size: 2.8rem;
    font-weight: 700;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
  }

  @media (min-width: 37.5em) {
    height: auto;
    display: flex;
    align-items: center;
    padding: 4.2rem;

    flex: 1 0 50%;
    order: ${(props) => (props.$isOdd ? '-1' : '0')};
  }
`;

function ZElement({ index, image, name, id, placeholder }) {
  return (
    <ZElementHTML>
      <ImageContainerEl
        id={id}
        image={image}
        placeholder={placeholder}
        name={name}
      />
      <ProductDetail $isOdd={index % 2}>
        <div>
          <p>{name}</p>
          <ButtonBlack to={`/products/${id}`}>see product</ButtonBlack>
        </div>
      </ProductDetail>
    </ZElementHTML>
  );
}

export default ZElement;
