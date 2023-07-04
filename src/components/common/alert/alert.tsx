import { useEffect, useState } from 'react';

interface AlertProps {
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return isVisible ? (
    <ul
      className="pointer-events-none fixed bottom-0 right-2.5 z-10 grid w-80 gap-2.5 pb-6"
      id="alert"
    >
      {children}
    </ul>
  ) : null;
};

export default Alert;
