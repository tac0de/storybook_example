/**
 * 🎓 UserHeader 컴포넌트 학습 가이드
 *
 * 이 파일은 Molecules 레벨의 컴포넌트로, Atoms를 조합하여 만든 복합 컴포넌트입니다.
 * 사용자 정보를 표시하는 헤더 컴포넌트로, Avatar와 Button Atoms를 활용합니다.
 *
 * 🎯 학습 포인트:
 * - Atoms 컴포넌트 조합 방법
 * - 재사용 가능한 컴포넌트 설계
 * - Props 인터페이스 설계
 * - 조건부 렌더링 패턴
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
import classNames from 'classnames/bind';

// 🧩 Atoms 컴포넌트들을 가져옵니다
// Molecules는 Atoms를 조합하여 만들어집니다
import { Button } from '../../Atoms/Button';
import { Avatar } from '../../Atoms/Avatar';

// 이 컴포넌트의 스타일을 가져옵니다
import styles from './UserHeader.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
const cx = classNames.bind(styles);

/**
 * 🎯 UserHeader 컴포넌트의 Props 인터페이스 정의
 *
 * 이 컴포넌트는 사용자 정보를 표시하는 헤더이므로,
 * 사용자와 관련된 정보들을 props로 받습니다.
 */
export interface UserHeaderProps {
  /**
   * 👤 사용자의 이름 (필수)
   * 버튼으로 표시되어 클릭 가능합니다
   */
  authorName: string;

  /**
   * 🖼️ 사용자의 프로필 이미지 URL (선택적)
   * 없으면 Avatar 컴포넌트가 기본 이미지를 표시합니다
   */
  authorAvatar?: string;

  /**
   * ⏰ 콘텐츠가 생성된 시간
   * "2시간 전", "1일 전" 등의 형태로 표시됩니다
   */
  timestamp: string;

  /**
   * ✅ 사용자 인증 여부 (선택적)
   * true일 때 인증된 사용자임을 나타내는 아이콘이 표시됩니다
   */
  isVerified?: boolean;

  /**
   * 🟢 사용자의 현재 상태 (선택적)
   * - 'online': 온라인 (초록색)
   * - 'offline': 오프라인 (회색)
   * - 'away': 자리비움 (노란색)
   * - 'busy': 바쁨 (빨간색)
   */
  authorStatus?: 'online' | 'offline' | 'away' | 'busy';

  /**
   * 👆 사용자 이름을 클릭했을 때 실행될 함수 (선택적)
   * 사용자 프로필 페이지로 이동하거나 모달을 열 때 사용합니다
   */
  onAuthorClick?: () => void;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;
}

/**
 * 🚀 UserHeader 컴포넌트 정의
 *
 * 이 컴포넌트는 Atoms인 Avatar와 Button을 조합하여 만든 Molecules 컴포넌트입니다.
 * 사용자 정보를 표시하는 재사용 가능한 헤더 컴포넌트입니다.
 */
export const UserHeader: React.FC<UserHeaderProps> = ({
  // 🎯 Props 구조 분해 할당
  authorName, // 필수 prop (기본값 없음)
  authorAvatar, // 선택적 prop (기본값 없음)
  timestamp, // 필수 prop (기본값 없음)
  isVerified = false, // 기본값: false
  authorStatus, // 선택적 prop (기본값 없음)
  onAuthorClick, // 선택적 prop (기본값 없음)
  className, // 선택적 prop (기본값 없음)
}) => {
  /**
   * 🎯 사용자 이름 클릭 핸들러
   *
   * 사용자 이름을 클릭했을 때 실행되는 함수입니다.
   * onAuthorClick 함수가 전달되었다면 실행하고, 없으면 아무것도 하지 않습니다.
   */
  const handleAuthorClick = () => {
    // 👆 onAuthorClick 함수가 전달되었다면 실행
    if (onAuthorClick) {
      onAuthorClick();
    }
  };

  /**
   * 🎨 CSS 클래스 조합 로직
   *
   * cx() 함수를 사용하여 여러 클래스를 조건부로 조합합니다.
   * 이렇게 하면 props에 따라 동적으로 스타일이 적용됩니다.
   */
  const headerClasses = cx(
    // 🎯 기본 클래스 (항상 적용)
    'user-header',

    // 🟢 authorStatus에 따른 클래스 (조건부 적용)
    {
      [`user-header--${authorStatus}`]: authorStatus,
    },

    // 🎨 사용자가 전달한 추가 클래스
    className
  );

  /**
   * 🎨 인증 아이콘 렌더링 함수
   *
   * isVerified가 true일 때 인증된 사용자임을 나타내는 아이콘을 표시합니다.
   */
  const renderVerifiedIcon = () => {
    if (!isVerified) return null;

    return (
      <span className={cx('verified-icon')} title='인증된 사용자'>
        ✓
      </span>
    );
  };

  /**
   * 🎨 상태 아이콘 렌더링 함수
   *
   * authorStatus가 있을 때 사용자의 현재 상태를 나타내는 아이콘을 표시합니다.
   */
  const renderStatusIcon = () => {
    if (!authorStatus) return null;

    const statusConfig = {
      online: { icon: '🟢', title: '온라인' },
      offline: { icon: '⚪', title: '오프라인' },
      away: { icon: '🟡', title: '자리비움' },
      busy: { icon: '🔴', title: '바쁨' },
    };

    const config = statusConfig[authorStatus];
    if (!config) return null;

    return (
      <span
        className={cx('status-icon', `status-icon--${authorStatus}`)}
        title={config.title}
      >
        {config.icon}
      </span>
    );
  };

  /**
   * 🎨 JSX 반환
   *
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 div 요소를 반환하되, 내부에 Avatar와 Button Atoms를 배치합니다.
   */
  return (
    <div className={headerClasses}>
      {/* 🖼️ 사용자 아바타 */}
      <Avatar
        src={authorAvatar}
        alt={`${authorName}의 프로필 이미지`}
        size='sm'
        className={cx('user-header__avatar')}
      />

      {/* 👤 사용자 정보 섹션 */}
      <div className={cx('user-header__info')}>
        {/* 👤 사용자 이름과 인증 아이콘 */}
        <div className={cx('user-header__name-section')}>
          <Button
            variant='text'
            size='sm'
            onClick={handleAuthorClick}
            className={cx('user-header__name-button')}
          >
            {authorName}
          </Button>
          {renderVerifiedIcon()}
          {renderStatusIcon()}
        </div>

        {/* ⏰ 타임스탬프 */}
        <time className={cx('user-header__timestamp')} dateTime={timestamp}>
          {timestamp}
        </time>
      </div>
    </div>
  );
};

/**
 * 📝 사용 예시:
 *
 * // 기본 사용법
 * <UserHeader
 *   authorName="김철수"
 *   authorAvatar="/images/avatar.jpg"
 *   timestamp="2시간 전"
 * />
 *
 * // 인증된 사용자
 * <UserHeader
 *   authorName="이영희"
 *   authorAvatar="/images/avatar.jpg"
 *   timestamp="1일 전"
 *   isVerified={true}
 * />
 *
 * // 온라인 상태의 사용자
 * <UserHeader
 *   authorName="박민수"
 *   authorAvatar="/images/avatar.jpg"
 *   timestamp="방금 전"
 *   authorStatus="online"
 *   onAuthorClick={() => console.log('사용자 클릭')}
 * />
 *
 * 🎯 이 컴포넌트의 장점:
 * 1. 재사용성: 다양한 곳에서 사용자 정보를 표시할 수 있음
 * 2. 일관성: 모든 사용자 헤더가 동일한 스타일을 가짐
 * 3. 유연성: props로 다양한 옵션을 제어할 수 있음
 * 4. 접근성: 적절한 HTML 구조와 ARIA 속성
 * 5. 확장성: 새로운 기능 추가가 용이
 *
 * 🏗️ 컴포넌트 계층 구조:
 * UserHeader (Molecules)
 * ├── Avatar (Atoms)
 * └── Button (Atoms)
 */
