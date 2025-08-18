/**
 * 🎓 Avatar 컴포넌트 학습 가이드
 *
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 Avatar 컴포넌트입니다.
 * 사용자 프로필 이미지나 이니셜을 표시하는 데 사용됩니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './Avatar.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('avatar', 'size-md') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 Avatar 컴포넌트의 Props 인터페이스 정의
 *
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface AvatarProps {
  /**
   * 🖼️ 사용자 프로필 이미지의 URL입니다
   * 이 값이 제공되면 이미지가 표시되고, 없으면 이니셜이 표시됩니다
   */
  src?: string;

  /**
   * 🏷️ 이미지의 대체 텍스트입니다 (접근성을 위해 필요)
   * 이미지가 로드되지 않을 때 표시되는 텍스트이기도 합니다
   */
  alt?: string;

  /**
   * 📏 아바타의 크기를 결정합니다
   * - 'sm': 작은 크기 (32px)
   * - 'md': 중간 크기 (40px) - 기본값
   * - 'lg': 큰 크기 (48px)
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 🔄 아바타의 모양을 결정합니다
   * - 'circle': 원형 (기본값)
   * - 'square': 정사각형
   * - 'rounded': 둥근 모서리의 정사각형
   */
  shape?: 'circle' | 'square' | 'rounded';

  /**
   * 🟢 사용자의 온라인 상태를 표시합니다
   * - 'online': 온라인 (초록색)
   * - 'offline': 오프라인 (회색)
   * - 'away': 자리비움 (노란색)
   * - 'busy': 바쁨 (빨간색)
   */
  status?: 'online' | 'offline' | 'away' | 'busy';

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;
}

/**
 * 🚀 Avatar 컴포넌트 정의
 *
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <AvatarProps>는 이 컴포넌트가 AvatarProps 타입의 props를 받는다는 의미입니다.
 */
export const Avatar: React.FC<AvatarProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  src, // 이미지 URL (선택적)
  alt = 'Avatar', // 대체 텍스트 (기본값: 'Avatar')
  size = 'md', // 크기 (기본값: 'md')
  shape = 'circle', // 모양 (기본값: 'circle')
  status, // 온라인 상태 (선택적)
  className, // 추가 CSS 클래스 (선택적)
}) => {
  /**
   * 🎯 이니셜 생성 함수
   *
   * 사용자 이름에서 이니셜을 추출하는 함수입니다.
   * 예: "John Doe" → "JD", "홍길동" → "홍"
   *
   * @param name - 사용자 이름
   * @returns 대문자로 변환된 이니셜 (최대 2글자)
   */
  const getInitials = (name: string) => {
    return name
      .split(' ') // 공백으로 이름을 분할
      .map(word => word.charAt(0)) // 각 단어의 첫 글자 추출
      .join('') // 글자들을 하나로 합침
      .toUpperCase() // 대문자로 변환
      .slice(0, 2); // 최대 2글자만 사용
  };

  /**
   * 🏷️ 표시할 이름 결정
   *
   * alt prop이 있으면 그것을 사용하고, 없으면 'User'를 기본값으로 사용합니다.
   * 이 값은 이미지가 없을 때 이니셜을 생성하는 데 사용됩니다.
   */
  const displayName = alt || 'User';

  /**
   * 🎨 JSX 반환
   *
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 아바타 컨테이너를 반환하되, 조건에 따라 이미지 또는 이니셜을 표시합니다.
   */
  return (
    <div
      className={cx(
        'avatar', // 기본 아바타 클래스
        `size-${size}`, // 크기에 따른 클래스
        `shape-${shape}`, // 모양에 따른 클래스
        className // 사용자가 전달한 추가 클래스
      )}
    >
      {/* 🖼️ 이미지 또는 이니셜 렌더링 */}
      {src ? (
        // 🖼️ src가 있으면 이미지 표시
        <img src={src} alt={alt} className={cx('image')} />
      ) : (
        // 🎯 src가 없으면 이니셜 표시
        <div className={cx('initials')}>{getInitials(displayName)}</div>
      )}

      {/* 🟢 온라인 상태 표시 (status prop이 있을 때만) */}
      {status && <div className={cx('status', `status-${status}`)} />}
    </div>
  );
};

/**
 * 📝 사용 예시:
 *
 * // 기본 아바타 (이니셜 표시)
 * <Avatar alt="John Doe" />
 *
 * // 이미지가 있는 아바타
 * <Avatar src="/path/to/image.jpg" alt="John Doe" />
 *
 * // 큰 크기의 원형 아바타
 * <Avatar size="lg" shape="circle" alt="Jane Smith" />
 *
 * // 온라인 상태가 표시되는 아바타
 * <Avatar alt="User" status="online" />
 *
 * // 정사각형 아바타
 * <Avatar shape="square" alt="User" />
 */
