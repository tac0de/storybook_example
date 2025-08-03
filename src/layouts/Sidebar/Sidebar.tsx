/**
 * 🎓 Sidebar 컴포넌트 학습 가이드
 * 
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 Sidebar 컴포넌트입니다.
 * 웹 페이지의 측면 사이드바 영역을 정의하는 레이아웃 컴포넌트로, 다양한 스타일과 동작을 지원합니다.
 * 네비게이션 메뉴, 필터, 추가 정보 등을 포함할 수 있는 유연한 사이드바 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './Sidebar.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('sidebar') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 Sidebar 컴포넌트의 Props 인터페이스 정의
 * 
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface SidebarProps {
  /**
   * 👶 사이드바 내부에 표시될 콘텐츠입니다
   * React에서는 children prop을 통해 컴포넌트 내부에 다른 요소들을 넣을 수 있습니다
   * 네비게이션 메뉴, 필터 옵션, 사용자 프로필, 추가 정보 등을 포함할 수 있습니다
   * 필수 prop이므로 반드시 전달해야 합니다
   */
  children: React.ReactNode;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;

  /**
   * 📍 사이드바의 위치를 결정합니다
   * - 'left': 왼쪽에 배치 (기본값)
   * - 'right': 오른쪽에 배치
   * 
   * 이 설정에 따라 사이드바가 화면의 어느 쪽에 나타날지 결정됩니다
   */
  position?: 'left' | 'right';

  /**
   * 📏 사이드바의 너비를 결정합니다
   * - 'sm': 작은 너비 (200px)
   * - 'md': 중간 너비 (250px) - 기본값
   * - 'lg': 큰 너비 (300px)
   * - 'xl': 매우 큰 너비 (350px)
   * 
   * collapsed가 true일 때는 이 너비가 무시되고 축소된 너비가 적용됩니다
   */
  width?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 🎨 사이드바의 시각적 스타일을 결정합니다
   * - 'default': 기본 스타일 (배경색과 테두리가 있는 일반적인 사이드바)
   * - 'minimal': 미니멀 스타일 (배경색이 없고 테두리만 있는 깔끔한 사이드바)
   * - 'elevated': 고급 스타일 (더 강한 그림자와 입체감이 있는 사이드바)
   * 기본값: 'default'
   */
  variant?: 'default' | 'minimal' | 'elevated';

  /**
   * 🔄 사이드바를 접을 수 있는지 결정합니다
   * true일 때 접기/펼치기 버튼이 표시되고, 사용자가 사이드바를 토글할 수 있습니다
   * 기본값: false
   */
  collapsible?: boolean;

  /**
   * 📦 사이드바가 접혀있는지 결정합니다
   * true일 때 사이드바가 축소된 상태로 표시됩니다
   * 기본값: false
   * 
   * collapsible이 false이면 이 설정은 무시됩니다
   */
  collapsed?: boolean;

  /**
   * 🔄 사이드바 토글 버튼을 클릭했을 때 호출되는 콜백 함수입니다
   * 사용자가 접기/펼치기 버튼을 클릭했을 때 실행됩니다
   * collapsible이 true일 때만 사용됩니다
   */
  onToggle?: () => void;
}

/**
 * 🚀 Sidebar 컴포넌트 정의
 * 
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <SidebarProps>는 이 컴포넌트가 SidebarProps 타입의 props를 받는다는 의미입니다.
 * 
 * 이 컴포넌트는 HTML aside 요소를 기반으로 하며, 다양한 스타일과 동작 옵션을 제공합니다.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  children,                   // 내부 콘텐츠 (필수)
  className,                  // 추가 CSS 클래스 (선택적)
  position = 'left',         // 위치 (기본값: 'left')
  width = 'md',              // 너비 (기본값: 'md')
  variant = 'default',       // 스타일 변형 (기본값: 'default')
  collapsible = false,       // 접기 가능 여부 (기본값: false)
  collapsed = false,         // 접힌 상태 (기본값: false)
  onToggle,                  // 토글 핸들러 (선택적)
}) => {
  /**
   * 🎨 JSX 반환
   * 
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 HTML aside 요소를 반환하되, 다양한 스타일과 동작 옵션을 CSS 클래스로 적용합니다.
   */
  return (
    <aside
      className={cx(
        'sidebar',                           // 기본 사이드바 클래스
        className,                           // 사용자가 전달한 추가 클래스
        {
          // 📍 위치 클래스 (position에 따른 클래스)
          [`position-${position}`]: position,
          
          // 📏 너비 클래스 (width에 따른 클래스)
          [`width-${width}`]: width,
          
          // 🎨 스타일 변형 클래스 (variant에 따른 클래스)
          [`variant-${variant}`]: variant,
          
          // 🔄 접기 가능 클래스 (collapsible이 true일 때만 적용)
          collapsible: collapsible,
          
          // 📦 접힌 상태 클래스 (collapsed가 true일 때만 적용)
          collapsed: collapsed,
        }
      )}
    >
      {/* 🔄 접기/펼치기 버튼 (collapsible이 true일 때만 표시) */}
      {collapsible && (
        <button
          className={cx('sidebar-toggle')}   // 토글 버튼 전용 클래스
          onClick={onToggle}                 // 클릭 핸들러
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}  // 접근성을 위한 라벨
        >
          {/* 📦 접힌 상태에 따른 화살표 방향 */}
          {collapsed ? '→' : '←'}
        </button>
      )}
      
      {/* 👶 사이드바 콘텐츠 컨테이너 */}
      <div className={cx('sidebar-content')}>
        {children}
      </div>
    </aside>
  );
};

/**
 * 📝 사용 예시:
 * 
 * // 기본 사이드바 (왼쪽, 중간 너비)
 * <Sidebar>
 *   <nav>
 *     <ul>
 *       <li><a href="/">홈</a></li>
 *       <li><a href="/about">소개</a></li>
 *       <li><a href="/contact">연락처</a></li>
 *     </ul>
 *   </nav>
 * </Sidebar>
 * 
 * // 오른쪽 사이드바 (큰 너비)
 * <Sidebar position="right" width="lg">
 *   <div className="user-profile">
 *     <h3>사용자 정보</h3>
 *     <p>이름: 김철수</p>
 *     <p>이메일: kim@example.com</p>
 *   </div>
 * </Sidebar>
 * 
 * // 접을 수 있는 사이드바
 * <Sidebar 
 *   collapsible 
 *   collapsed={isCollapsed} 
 *   onToggle={() => setIsCollapsed(!isCollapsed)}
 * >
 *   <nav>네비게이션 메뉴</nav>
 * </Sidebar>
 * 
 * // 미니멀 스타일 사이드바
 * <Sidebar variant="minimal" width="sm">
 *   <div className="filters">
 *     <h3>필터</h3>
 *     <label><input type="checkbox" /> 카테고리 1</label>
 *     <label><input type="checkbox" /> 카테고리 2</label>
 *   </div>
 * </Sidebar>
 * 
 * // 고급 스타일 사이드바 (강한 그림자)
 * <Sidebar variant="elevated" width="xl">
 *   <div className="sidebar-content">
 *     <h2>대시보드</h2>
 *     <nav>메뉴 항목들</nav>
 *   </div>
 * </Sidebar>
 * 
 * // 복합적인 사용 예시
 * <Sidebar 
 *   position="left" 
 *   width="lg" 
 *   variant="elevated" 
 *   collapsible 
 *   collapsed={sidebarCollapsed} 
 *   onToggle={handleSidebarToggle}
 *   className="main-sidebar"
 * >
 *   <div className="sidebar-header">
 *     <h2>MyApp</h2>
 *   </div>
 *   <nav className="sidebar-nav">
 *     <ul>
 *       <li><a href="/dashboard">대시보드</a></li>
 *       <li><a href="/users">사용자 관리</a></li>
 *       <li><a href="/settings">설정</a></li>
 *     </ul>
 *   </nav>
 *   <div className="sidebar-footer">
 *     <p>버전 1.0.0</p>
 *   </div>
 * </Sidebar>
 * 
 * 🎯 이 컴포넌트의 특징:
 * 1. 유연성: 다양한 위치, 너비, 스타일 옵션 제공
 * 2. 접근성: HTML aside 요소를 사용하여 시맨틱 마크업 준수
 * 3. 반응형: CSS 미디어 쿼리와 함께 사용하여 모바일 대응 가능
 * 4. 토글 기능: 접기/펼치기 기능으로 공간 효율성 향상
 * 5. 커스터마이징: className prop으로 추가 스타일링 가능
 * 
 * 🏗️ 컴포넌트 구조:
 * Sidebar (Layout)
 * ├── aside element (시맨틱 HTML 요소)
 * ├── button element (토글 버튼, collapsible일 때만)
 * └── div element (콘텐츠 컨테이너)
 *     └── children (동적으로 전달되는 콘텐츠)
 * 
 * 💡 팁:
 * - position 옵션에 따라 메인 콘텐츠의 레이아웃을 조정해야 합니다
 * - collapsible 옵션을 사용할 때는 부모 컴포넌트에서 collapsed 상태를 관리해야 합니다
 * - 모바일에서는 사이드바가 오버레이로 표시되도록 CSS를 설정하는 것이 좋습니다
 * - 이 컴포넌트는 Header, Container, Footer 등 다른 레이아웃 컴포넌트들과 조합하여 사용할 수 있습니다
 * - 접근성을 위해 키보드 네비게이션과 스크린 리더 지원을 고려해야 합니다
 * 
 **/
