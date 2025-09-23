import * as React from 'react';
import classNames from 'classnames';
import type { JSX } from 'react';

export type VhProps = React.HTMLAttributes<HTMLElement> & {
  /** 기본 'span' */
  as?: keyof JSX.IntrinsicElements;
  /** 전역 CSS(.visually_hidden)를 사용합니다. */
  children: React.ReactNode;
  className?: string;
};

/**
 * 스크린리더 전용 텍스트(시각적 숨김)
 * - 전역 CSS에 `.visually_hidden` 클래스가 있다고 가정합니다.
 * - 마크업 유연성을 위해 `as`로 태그를 바꿀 수 있습니다.
 */
export const Vh = React.forwardRef<HTMLElement, VhProps>(function Vh(
  { as = 'span', className, children, ...rest },
  ref
) {
  const Comp = as as any;
  return (
    <Comp ref={ref as any} className={classNames('visually_hidden', className)} {...rest}>
      {children}
    </Comp>
  );
});

export default Vh;
