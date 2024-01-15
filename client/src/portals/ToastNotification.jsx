import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

function ToastNotification() {
  return createPortal(
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />,
    document.getElementById('portal-root')
  );
}

export default ToastNotification;
