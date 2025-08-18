/**
 * 🎓 Container 컴포넌트 학습 가이드
 *
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 Container 컴포넌트입니다.
 * 콘텐츠를 감싸는 레이아웃 컴포넌트로, 최대 너비, 패딩, 중앙 정렬 등을 제어할 수 있습니다.
 * 웹 페이지의 메인 콘텐츠 영역을 정의하는 데 사용되는 기본적인 레이아웃 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './Container.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('container') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 Container 컴포넌트의 Props 인터페이스 정의
 *
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface ContainerProps {
  /**
   * 👶 컨테이너 내부에 표시될 콘텐츠입니다
   * React에서는 children prop을 통해 컴포넌트 내부에 다른 요소들을 넣을 수 있습니다
   * 필수 prop이므로 반드시 전달해야 합니다
   */
  children: React.ReactNode;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;

  /**
   * 📏 컨테이너의 최대 너비를 결정합니다
   * - 'sm': 작은 너비 (576px)
   * - 'md': 중간 너비 (768px)
   * - 'lg': 큰 너비 (1024px) - 기본값
   * - 'xl': 매우 큰 너비 (1200px)
   * - 'full': 전체 너비 (100%)
   *
   * fluid가 true이거나 maxWidth가 'full'이면 이 설정은 무시됩니다
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * 📐 컨테이너의 내부 패딩을 결정합니다
   * - 'none': 패딩 없음 (0px)
   * - 'sm': 작은 패딩 (8px)
   * - 'md': 중간 패딩 (16px) - 기본값
   * - 'lg': 큰 패딩 (24px)
   * - 'xl': 매우 큰 패딩 (32px)
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 🎯 컨테이너를 화면 중앙에 정렬할지 결정합니다
   * true일 때 margin: 0 auto가 적용되어 컨테이너가 중앙에 위치합니다
   * 기본값: true
   *
   * fluid가 true이면 이 설정은 무시됩니다
   */
  centered?: boolean;

  /**
   * 🌊 컨테이너를 유동적으로 만들지 결정합니다
   * true일 때 최대 너비 제한이 없어지고 전체 너비를 사용합니다
   * 기본값: false
   *
   * 이 옵션이 true이면 maxWidth와 centered 설정이 무시됩니다
   */
  fluid?: boolean;
}

/**
 * 🚀 Container 컴포넌트 정의
 *
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <ContainerProps>는 이 컴포넌트가 ContainerProps 타입의 props를 받는다는 의미입니다.
 *
 * 이 컴포넌트는 다양한 레이아웃 옵션을 제공하여 콘텐츠를 유연하게 배치할 수 있습니다.
 */
export const Container: React.FC<ContainerProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  children, // 내부 콘텐츠 (필수)
  className, // 추가 CSS 클래스 (선택적)
  maxWidth = 'lg', // 최대 너비 (기본값: 'lg')
  padding = 'md', // 내부 패딩 (기본값: 'md')
  centered = true, // 중앙 정렬 (기본값: true)
  fluid = false, // 유동적 너비 (기본값: false)
}) => {
  /**
   * 🎨 JSX 반환
   *
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 div 요소를 반환하되, 다양한 레이아웃 옵션을 CSS 클래스로 적용합니다.
   */
  return (
    <div
      className={cx(
        'container', // 기본 컨테이너 클래스
        className, // 사용자가 전달한 추가 클래스
        {
          // 📏 최대 너비 클래스 (fluid가 false이고 maxWidth가 'full'이 아닐 때만 적용)
          [`max-width-${maxWidth}`]: maxWidth !== 'full' && !fluid,

          // 📐 패딩 클래스 (패딩이 'none'이 아닐 때만 적용)
          [`padding-${padding}`]: padding !== 'none',

          // 🎯 중앙 정렬 클래스 (centered가 true이고 fluid가 false일 때만 적용)
          centered: centered && !fluid,

          // 🌊 유동적 너비 클래스 (fluid가 true일 때만 적용)
          fluid,
        }
      )}
    >
      {/* 👶 내부 콘텐츠 렌더링 */}
      {children}
    </div>
  );
};

/**
 * 📝 사용 예시:
 *
 * // 기본 사용법 (중간 너비, 중앙 정렬)
 * <Container>
 *   <h1>제목</h1>
 *   <p>내용...</p>
 * </Container>
 *
 * // 작은 너비, 큰 패딩
 * <Container maxWidth="sm" padding="lg">
 *   <div>좁은 영역의 콘텐츠</div>
 * </Container>
 *
 * // 전체 너비 사용
 * <Container maxWidth="full">
 *   <div>전체 너비 콘텐츠</div>
 * </Container>
 *
 * // 유동적 컨테이너 (최대 너비 제한 없음)
 * <Container fluid>
 *   <div>전체 화면 너비 사용</div>
 * </Container>
 *
 * // 패딩 없음, 중앙 정렬 안함
 * <Container padding="none" centered={false}>
 *   <div>테두리까지 콘텐츠</div>
 * </Container>
 *
 * // 커스텀 클래스 추가
 * <Container className="my-custom-container">
 *   <div>커스텀 스타일이 적용된 컨테이너</div>
 * </Container>
 *
 * 🎯 이 컴포넌트의 특징:
 * 1. 유연성: 다양한 너비와 패딩 옵션 제공
 * 2. 반응형: CSS 미디어 쿼리와 함께 사용하여 반응형 레이아웃 구현 가능
 * 3. 재사용성: 모든 페이지에서 일관된 레이아웃 제공
 * 4. 커스터마이징: className prop으로 추가 스타일링 가능
 * 5. 직관성: 명확한 prop 이름으로 쉽게 이해 가능
 *
 * 🏗️ 컴포넌트 구조:
 * Container (Layout)
 * └── div element (기본 HTML 요소)
 *     └── children (동적으로 전달되는 콘텐츠)
 *
 * 💡 팁:
 * - fluid 옵션은 최대 너비 제한을 완전히 제거합니다
 * - centered 옵션은 fluid가 true일 때 무시됩니다
 * - maxWidth와 padding은 CSS 변수나 미디어 쿼리와 함께 사용하면 더욱 유연합니다
 * - 이 컴포넌트는 다른 레이아웃 컴포넌트들과 조합하여 사용할 수 있습니다
 *
 * 🎨 CSS 클래스 예시:
 * .container { 기본 스타일 }
 * .container.max-width-sm { max-width: 576px; }
 * .container.max-width-md { max-width: 768px; }
 * .container.max-width-lg { max-width: 1024px; }
 * .container.max-width-xl { max-width: 1200px; }
 * .container.padding-sm { padding: 8px; }
 * .container.padding-md { padding: 16px; }
 * .container.padding-lg { padding: 24px; }
 * .container.padding-xl { padding: 32px; }
 * .container.centered { margin: 0 auto; }
 * .container.fluid { max-width: none; }
 **/
