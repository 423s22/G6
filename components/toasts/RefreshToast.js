import { toast} from 'react-toastify';

export default function notifyRefresh() {
toast.info('Please click Applied Options or Refresh to view newly applied options', {
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}
