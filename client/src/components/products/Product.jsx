import styled from 'styled-components';

import Features from './Features';
import ImageGallery from './ImageGallery';
import ProductSummary from './ProductSummary';

const ProductEl = styled.article`
  --gap: 8.8rem;

  display: flex;
  flex-direction: column;
  gap: var(--gap);

  @media (min-width: 37.5em) {
    --gap: 12rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  @media (min-width: 56.25em) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: calc(var(--gap) * 0.75);
  }

  @media (min-width: 68.75em) {
    justify-content: flex-start;
    gap: var(--gap);
  }
`;

function Product({ product }) {
  return (
    <ProductEl>
      <ProductSummary
        name={product.name}
        image={product.image}
        isNew={product.isNew}
        category={product.category}
        description={product.description}
        price={product.price}
        id={product.id}
        placeholder={product.placeholderImage}
      />
      <FlexContainer>
        <Features features={product.features} />
      </FlexContainer>
      {product.gallery.length ? (
        <ImageGallery
          gallery={product.gallery}
          placeholderGallery={product.placeholderGallery}
        />
      ) : (
        ''
      )}
    </ProductEl>
  );
}

export default Product;
