import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export default function errorToast(message = 'Não foi possível completar esta operação') {
  return toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}