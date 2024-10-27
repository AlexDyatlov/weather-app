interface SvgIconProps {
  name: string;
  size: string;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, size, className, ...props }) => {
  return (
    <svg className={`shrink-0 fill-current ${className}`} width={size} height={size} {...props}>
      <use xlinkHref={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default SvgIcon;
