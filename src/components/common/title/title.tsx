type TitleTag = 'h1' | 'h2' | 'h3' | 'div';

interface TitleProps {
  className: string;
  children: string[] | React.ReactNode;
  tag: TitleTag;
}

const Title: React.FC<TitleProps> = ({ className, children, tag }) => {
  const TagName = tag;

  return <TagName className={className}>{children}</TagName>;
};

export default Title;
