import React from 'react';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  shape = 'circle',
  status,
  className,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = alt || 'User';

  return (
    <div className={cx('avatar', `size-${size}`, `shape-${shape}`, className)}>
      {src ? (
        <img src={src} alt={alt} className={cx('image')} />
      ) : (
        <div className={cx('initials')}>{getInitials(displayName)}</div>
      )}
      {status && <div className={cx('status', `status-${status}`)} />}
    </div>
  );
};
