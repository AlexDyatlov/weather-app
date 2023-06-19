interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto max-w-[1170px] px-10 py-8 md:px-[15px] xl:px-6">{children}</div>;
};

export default Container;
