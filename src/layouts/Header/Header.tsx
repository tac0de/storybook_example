/**
 * 🎓 Header 컴포넌트 학습 가이드
 *
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 Header 컴포넌트입니다.
 * 웹 페이지의 상단 헤더 영역을 정의하는 레이아웃 컴포넌트로, 다양한 스타일과 동작을 지원합니다.
 * 네비게이션, 로고, 사용자 메뉴 등을 포함할 수 있는 유연한 헤더 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 타입들을 가져옵니다
import type { ReactNode } from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './Header.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('header') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 Header 컴포넌트의 Props 인터페이스 정의
 *
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface HeaderProps {
  /**
   * 👶 헤더 내부에 표시될 콘텐츠입니다
   * React에서는 children prop을 통해 컴포넌트 내부에 다른 요소들을 넣을 수 있습니다
   * 로고, 네비게이션 메뉴, 사용자 프로필 등을 포함할 수 있습니다
   * 필수 prop이므로 반드시 전달해야 합니다
   */
  children: ReactNode;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;

  /**
   * 🎨 헤더의 시각적 스타일을 결정합니다
   * - 'default': 기본 스타일 (배경색과 그림자가 있는 일반적인 헤더)
   * - 'minimal': 미니멀 스타일 (배경색이 없고 테두리만 있는 깔끔한 헤더)
   * - 'elevated': 고급 스타일 (더 강한 그림자와 입체감이 있는 헤더)
   * 기본값: 'default'
   */
  variant?: 'default' | 'minimal' | 'elevated';

  /**
   * 📌 헤더를 고정할지 결정합니다
   * true일 때 position: sticky가 적용되어 스크롤 시에도 헤더가 상단에 고정됩니다
   * 사용자가 페이지를 스크롤해도 헤더가 항상 보이게 됩니다
   * 기본값: false
   */
  sticky?: boolean;

  /**
   * 🌫️ 헤더를 투명하게 만들지 결정합니다
   * true일 때 배경이 투명해져서 뒤의 콘텐츠가 비쳐 보입니다
   * 랜딩 페이지나 히어로 섹션에서 자주 사용되는 스타일입니다
   * 기본값: false
   */
  transparent?: boolean;
}

/**
 * 🚀 Header 컴포넌트 정의
 *
 * 이 컴포넌트는 HTML header 요소를 기반으로 하며, 다양한 스타일 옵션을 제공합니다.
 */
export const Header = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  children, // 내부 콘텐츠 (필수)
  className, // 추가 CSS 클래스 (선택적)
  variant = 'default', // 스타일 변형 (기본값: 'default')
  sticky = false, // 고정 여부 (기본값: false)
  transparent = false, // 투명 여부 (기본값: false)
}: HeaderProps) => {
  /**
   * 🎨 JSX 반환
   *
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 HTML header 요소를 반환하되, 다양한 스타일 옵션을 CSS 클래스로 적용합니다.
   */
  return (
    <header
      className={cx('header', className, {
        [`variant-${variant}`]: !!variant,
        sticky,
        transparent,
      })}
      data-testid="header-component"
    >
      {/* 👶 내부 콘텐츠 렌더링 */}
      {children}
    </header>
  );
};

/**
 * 📝 사용 예시:
 *
 * // 기본 헤더
 * <Header>
 *   <div className="logo">로고</div>
 *   <nav>네비게이션 메뉴</nav>
 *   <div className="user-menu">사용자 메뉴</div>
 * </Header>
 *
 * // 고정된 헤더 (스크롤 시에도 상단에 고정)
 * <Header sticky>
 *   <div className="logo">로고</div>
 *   <nav>네비게이션 메뉴</nav>
 * </Header>
 *
 * // 투명한 헤더 (배경이 투명)
 * <Header transparent>
 *   <div className="logo">로고</div>
 *   <nav>네비게이션 메뉴</nav>
 * </Header>
 *
 * // 미니멀 스타일 헤더
 * <Header variant="minimal">
 *   <div className="logo">로고</div>
 *   <nav>네비게이션 메뉴</nav>
 * </Header>
 *
 * // 고급 스타일 헤더 (강한 그림자)
 * <Header variant="elevated" sticky>
 *   <div className="logo">로고</div>
 *   <nav>네비게이션 메뉴</nav>
 * </Header>
 *
 * // 커스텀 클래스 추가
 * <Header className="my-custom-header">
 *   <div>커스텀 스타일이 적용된 헤더</div>
 * </Header>
 *
 * // 복합적인 사용 예시
 * <Header
 *   variant="elevated"
 *   sticky
 *   transparent
 *   className="main-header"
 * >
 *   <div className="header-content">
 *     <div className="logo">MyApp</div>
 *     <nav className="main-nav">
 *       <a href="/">홈</a>
 *       <a href="/about">소개</a>
 *       <a href="/contact">연락처</a>
 *     </nav>
 *     <div className="user-actions">
 *       <button>로그인</button>
 *     </div>
 *   </div>
 * </Header>
 *
 * 🎯 이 컴포넌트의 특징:
 * 1. 유연성: 다양한 스타일과 동작 옵션 제공
 * 2. 접근성: HTML header 요소를 사용하여 시맨틱 마크업 준수
 * 3. 재사용성: 모든 페이지에서 일관된 헤더 스타일 제공
 * 4. 커스터마이징: className prop으로 추가 스타일링 가능
 * 5. 조합 가능: 다른 레이아웃 컴포넌트들과 함께 사용 가능
 *
 * 🏗️ 컴포넌트 구조:
 * Header (Layout)
 * └── header element (시맨틱 HTML 요소)
 *     └── children (동적으로 전달되는 콘텐츠)
 *
 * 💡 팁:
 * - sticky 옵션은 position: sticky를 사용하므로 브라우저 지원을 확인해야 합니다
 * - transparent 옵션은 배경이 투명해지므로 텍스트 가독성을 고려해야 합니다
 * - variant 옵션들은 CSS로 미리 정의된 스타일을 적용합니다
 * - 이 컴포넌트는 Container, Sidebar 등 다른 레이아웃 컴포넌트들과 조합하여 사용할 수 있습니다
 * - 반응형 디자인을 위해 CSS 미디어 쿼리와 함께 사용하는 것을 권장합니다
 *
 **/
