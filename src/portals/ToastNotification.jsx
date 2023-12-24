import styled, { css } from "styled-components";
import { createPortal } from "react-dom";
import { useToast } from "../context/ToastContext";
import { TOAST_TYPES } from "../components/utils/constants";

const ToastContainer = styled.div`
  position: fixed;
  right: 5rem;
  bottom: 5rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  z-index: 9999;
`;

const Toast = styled.div`
  ${(props) => {
    if (props.$type === TOAST_TYPES.SUCCESS) {
      return css`
        color: var(--light-green);
        background-color: var(--green);

        div {
          background-color: var(--icon-green);
        }

        .icon {
          fill: var(--green);
        }
      `;
    } else if (props.$type === TOAST_TYPES.ERROR) {
      return css`
        color: var(--light-red);
        background-color: var(--red);

        div {
          background-color: var(--icon-red);
        }

        .icon {
          fill: var(--red);
        }
      `;
    }
  }}

  padding: 1.2rem 2.4rem 1.2rem 1.2rem;
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  gap: 1.2rem;

  p {
    font-weight: 700;
    letter-spacing: 0.25px;
  }

  div {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
  }

  .icon {
    width: 50%;
    height: 50%;
  }
`;

function ToastNotification() {
  const { toasts, removeToast } = useToast();

  const handleClick = function (event) {
    const parent = event.target.closest("[id]");
    const id = parent.id;
    removeToast(id);
  };

  return createPortal(
    <ToastContainer>
      {toasts.map((toast) => {
        const icon = toast.type === "success" ? "checkmark" : "cross";

        return (
          <Toast
            key={toast.id}
            id={toast.id}
            $type={toast.type}
            onClick={handleClick}
          >
            <div>
              <svg className="icon icon-cross">
                <use xlinkHref={`/assets/symbol-defs.svg#icon-${icon}`}></use>
              </svg>
            </div>
            <p>{toast.message}</p>
          </Toast>
        );
      })}
    </ToastContainer>,
    document.getElementById("portal-root")
  );
}

export default ToastNotification;
