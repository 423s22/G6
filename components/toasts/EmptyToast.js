import { toast} from 'react-toastify';

export default function notifyEmpty() {
toast.info('No options are currently applied', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}