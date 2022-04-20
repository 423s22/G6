import { toast} from 'react-toastify';

export default function notifySuccess() {
    toast('Success! Your custom option has been applied', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }