import { toast} from 'react-toastify';

export default function notifySuccess() {
    toast.success('Success! Your price has been applied', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }