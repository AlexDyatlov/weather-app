import cs from 'classnames';

interface AlertMessageProps {
  type: string;
  message: string | null;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  return (
    <li className="overflow-hidden">
      <span
        className={cs(
          'block translate-y-full animate-alert rounded border border-transparent px-3.5 py-1.5',
          {
            'border-[#f5c6cb] bg-[#f8d7da] text-[#721c24]': type === 'error',
            'border-[#c3e6cb] bg-[#d4edda] text-[#155724]': type === 'success'
          }
        )}
      >
        {message}
      </span>
    </li>
  );
};

export default AlertMessage;
