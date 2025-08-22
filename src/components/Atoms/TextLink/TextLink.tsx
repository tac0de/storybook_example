import React, { memo } from 'react';
import classNamesBind from 'classnames/bind';
import styles from './TextLink.module.scss';

const cx = classNamesBind.bind(styles);

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 현재 페이지와 일치 → 강조 표시 */
  active?: boolean;
  /** 비활성/회색 처리 */
  muted?: boolean;
  /** 구분선 파이프(|) 표시 여부 */
  withSeparator?: boolean;
}

const TextLink: React.FC<TextLinkProps> = memo(function TextLink({
  active = false,
  muted = false,
  withSeparator = false,
  className,
  children,
  ...anchorProps
}) {
  return (
    <a {...anchorProps} className={cx('root', { active, muted, separator: withSeparator }, className)}>
      {children}
    </a>
  );
});

export default TextLink;
