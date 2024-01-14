import styled from "styled-components";

const OverlayEl = styled.div`
  position: ${(props) => props.$position ?? "fixed"};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.4);
  z-index: 5;
`;

function Overlay({ handleClick, position }) {
  return <OverlayEl $position={position} onClick={handleClick} />;
}

export default Overlay;
