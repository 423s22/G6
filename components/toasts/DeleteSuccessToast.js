import { toast} from 'react-toastify';

export default function notifyDeleteSuccess() {
    toast.success('Success! The selected option has been removed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }