import styled from "styled-components";

const ImageContainerEl = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: var(--border-radius);
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function ImageContainer({ children, className }) {
  return <ImageContainerEl className={className}>{children}</ImageContainerEl>;
}

export default ImageContainer;
