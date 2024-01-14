import { createPortal } from "react-dom";

import Overlay from "../components/utils/Overlay";

function Portal({ children, handleClick }) {
  return createPortal(
    <>
      <Overlay handleClick={handleClick} />
      {children}
    </>,
    document.getElementById("portal-root")
  );
}

export default Portal;
