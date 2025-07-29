import type React from 'react';

export interface AvatarProps {
  /** 프로필 이미지 URL */
  readonly src?: string;
  /** 대체 텍스트 또는 이니셜 */
  readonly alt: string;
  /** 크기 변형 */
  readonly size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 모양 */
  readonly shape?: 'circle' | 'square' | 'rounded';
  /** 상태 표시 (온라인, 오프라인 등) */
  readonly status?: 'online' | 'offline' | 'away' | 'busy';
  /** 클릭 핸들러 */
  readonly onClick?: () => void;
  /** 추가 클래스 */
  readonly className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  shape = 'circle',
  status,
  onClick,
  className = '',
}) => {
  // 크기 클래스 매핑
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  // 모양 클래스 매핑
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg',
  };

  // 상태 클래스 매핑
  const statusClasses = {
    online: 'ring-2 ring-green-400',
    offline: 'ring-2 ring-gray-400',
    away: 'ring-2 ring-yellow-400',
    busy: 'ring-2 ring-red-400',
  };

  const baseClasses =
    'inline-flex items-center justify-center font-bold object-cover overflow-hidden bg-gray-200 text-gray-600 transition-colors';
  const interactiveClasses = onClick ? 'cursor-pointer hover:opacity-80' : '';
  const statusRingClasses = status ? statusClasses[status] : '';

  const combinedClasses = [
    baseClasses,
    sizeClasses[size],
    shapeClasses[shape],
    statusRingClasses,
    interactiveClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const initials = alt.slice(0, 2).toUpperCase();

  return (
    <div className='relative inline-block'>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={combinedClasses}
          onClick={onClick}
        />
      ) : (
        <span
          className={`${combinedClasses} bg-gray-400 text-white`}
          onClick={onClick}
        >
          {initials}
        </span>
      )}

      {/* 상태 표시 점 */}
      {status && (
        <span
          className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${
            status === 'online'
              ? 'bg-green-400'
              : status === 'offline'
                ? 'bg-gray-400'
                : status === 'away'
                  ? 'bg-yellow-400'
                  : 'bg-red-400'
          }`}
        />
      )}
    </div>
  );
};
