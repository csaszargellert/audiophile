import styled from "styled-components";

import Product from "./ProductCategory";

const ProductsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12rem;
`;

function ProductCategories({ products, category }) {
  return (
    <ProductsContainer>
      {products.map((product, index) => {
        return (
          <Product
            key={product.id}
            id={product.id}
            index={index}
            isNew={product.isNew}
            description={product.description}
            name={product.name}
            category={category}
            image={product.image}
          />
        );
      })}
    </ProductsContainer>
  );
}

export default ProductCategories;
