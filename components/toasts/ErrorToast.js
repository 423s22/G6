import { toast} from 'react-toastify';

export default function notifyError() {
    toast.error('Operation could not be completed at this time. Please try again. If issue persists, please contact customer support', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }