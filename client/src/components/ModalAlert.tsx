interface ModalAlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

export const ModalAlert: React.FC<ModalAlertProps> = ({ type, message }) => {
  const alertClasses = {
    success: "bg-green-200 text-green-800 mt-4 text-center font-semibold",
    error: "bg-red-200 text-red-800 mt-4 text-center font-semibold",
    info: "bg-blue-200 text-blue-800 mt-4 text-center font-semibold",
  };

  const classes = `p-4 rounded-md ${alertClasses[type]}`;

  return (
    <div className={classes}>
      <p>{message}</p>
    </div>
  );
};
