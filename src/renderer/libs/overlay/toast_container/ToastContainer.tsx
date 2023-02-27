import AlertToast from '@components/alert_toast';
import './style/index.scss';
import { useToast } from '@libs/overlay/stores/toasts';
interface ToastContainerProps {}
export default function ToastContainer({}: ToastContainerProps) {
  const toasts = useToast();
  return (
    <>
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <AlertToast key={toast.id} {...toast} />
          ))}
        </div>
      )}
    </>
  );
}
