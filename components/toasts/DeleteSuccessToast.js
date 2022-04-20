import { toast} from 'react-toastify';

export default function notifyDeleteSuccess() {
    toast('Success! The selected option has been removed', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }