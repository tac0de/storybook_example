import classNames from 'classnames';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  gap?: CSSProperties['gap'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: boolean;
  inline?: boolean;
  children: ReactNode;
}

export default function Stack({
  direction = 'column',
  gap = '1rem',
  align,
  justify,
  wrap = false,
  inline = false,
  className,
  style,
  children,
  ...rest
}: StackProps) {
  const stackStyle: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: direction,
    gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...style,
  };

  return (
    <div className={classNames('stack', className)} style={stackStyle} {...rest}>
      {children}
    </div>
  );
}
