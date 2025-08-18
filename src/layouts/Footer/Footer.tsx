/**
 * 🎓 Footer 컴포넌트 학습 가이드
 *
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 Footer 컴포넌트입니다.
 * 웹 페이지의 하단 푸터 영역을 정의하는 레이아웃 컴포넌트로, 다양한 스타일과 동작을 지원합니다.
 * 저작권 정보, 링크, 연락처 정보 등을 포함할 수 있는 유연한 푸터 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './Footer.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('footer') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 Footer 컴포넌트의 Props 인터페이스 정의
 *
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface FooterProps {
  /**
   * 👶 푸터 내부에 표시될 콘텐츠입니다
   * React에서는 children prop을 통해 컴포넌트 내부에 다른 요소들을 넣을 수 있습니다
   * 저작권 정보, 링크 목록, 연락처 정보, 소셜 미디어 아이콘 등을 포함할 수 있습니다
   * 필수 prop이므로 반드시 전달해야 합니다
   */
  children: React.ReactNode;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;

  /**
   * 🎨 푸터의 시각적 스타일을 결정합니다
   * - 'default': 기본 스타일 (밝은 배경색과 테두리가 있는 일반적인 푸터)
   * - 'minimal': 미니멀 스타일 (배경색이 없고 테두리만 있는 깔끔한 푸터)
   * - 'dark': 다크 스타일 (어두운 배경색과 밝은 텍스트가 있는 푸터)
   * 기본값: 'default'
   */
  variant?: 'default' | 'minimal' | 'dark';

  /**
   * 📌 푸터를 고정할지 결정합니다
   * true일 때 position: fixed가 적용되어 푸터가 화면 하단에 고정됩니다
   * 사용자가 페이지를 스크롤해도 푸터가 항상 하단에 보이게 됩니다
   * 기본값: false
   *
   * 주의: fixed가 true일 때는 메인 콘텐츠에 하단 패딩을 추가해야 푸터와 겹치지 않습니다
   */
  fixed?: boolean;
}

/**
 * 🚀 Footer 컴포넌트 정의
 *
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <FooterProps>는 이 컴포넌트가 FooterProps 타입의 props를 받는다는 의미입니다.
 *
 * 이 컴포넌트는 HTML footer 요소를 기반으로 하며, 다양한 스타일 옵션을 제공합니다.
 */
export const Footer: React.FC<FooterProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  children, // 내부 콘텐츠 (필수)
  className, // 추가 CSS 클래스 (선택적)
  variant = 'default', // 스타일 변형 (기본값: 'default')
  fixed = false, // 고정 여부 (기본값: false)
}) => {
  /**
   * 🎨 JSX 반환
   *
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 HTML footer 요소를 반환하되, 다양한 스타일 옵션을 CSS 클래스로 적용합니다.
   */
  return (
    <footer
      className={cx(
        'footer', // 기본 푸터 클래스
        className, // 사용자가 전달한 추가 클래스
        {
          // 🎨 스타일 변형 클래스 (variant에 따른 클래스)
          [`variant-${variant}`]: variant,

          // 📌 고정 클래스 (fixed가 true일 때만 적용)
          fixed,
        }
      )}
    >
      {/* 👶 내부 콘텐츠 렌더링 */}
      {children}
    </footer>
  );
};

/**
 * 📝 사용 예시:
 *
 * // 기본 푸터
 * <Footer>
 *   <div className="footer-content">
 *     <p>&copy; 2024 MyApp. All rights reserved.</p>
 *     <nav>링크 목록</nav>
 *   </div>
 * </Footer>
 *
 * // 고정된 푸터 (화면 하단에 고정)
 * <Footer fixed>
 *   <div className="footer-content">
 *     <p>&copy; 2024 MyApp. All rights reserved.</p>
 *   </div>
 * </Footer>
 *
 * // 다크 스타일 푸터
 * <Footer variant="dark">
 *   <div className="footer-content">
 *     <p>&copy; 2024 MyApp. All rights reserved.</p>
 *     <nav>링크 목록</nav>
 *   </div>
 * </Footer>
 *
 * // 미니멀 스타일 푸터
 * <Footer variant="minimal">
 *   <div className="footer-content">
 *     <p>&copy; 2024 MyApp. All rights reserved.</p>
 *   </div>
 * </Footer>
 *
 * // 고정된 다크 푸터
 * <Footer variant="dark" fixed>
 *   <div className="footer-content">
 *     <p>&copy; 2024 MyApp. All rights reserved.</p>
 *     <nav>링크 목록</nav>
 *   </div>
 * </Footer>
 *
 * // 커스텀 클래스 추가
 * <Footer className="my-custom-footer">
 *   <div>커스텀 스타일이 적용된 푸터</div>
 * </Footer>
 *
 * // 복합적인 사용 예시
 * <Footer
 *   variant="dark"
 *   fixed
 *   className="main-footer"
 * >
 *   <div className="footer-container">
 *     <div className="footer-section">
 *       <h3>회사 정보</h3>
 *       <p>MyApp은 혁신적인 솔루션을 제공합니다.</p>
 *     </div>
 *     <div className="footer-section">
 *       <h3>링크</h3>
 *       <nav>
 *         <a href="/about">소개</a>
 *         <a href="/contact">연락처</a>
 *         <a href="/privacy">개인정보처리방침</a>
 *       </nav>
 *     </div>
 *     <div className="footer-section">
 *       <h3>연락처</h3>
 *       <p>이메일: contact@myapp.com</p>
 *       <p>전화: 02-1234-5678</p>
 *     </div>
 *     <div className="footer-bottom">
 *       <p>&copy; 2024 MyApp. All rights reserved.</p>
 *     </div>
 *   </div>
 * </Footer>
 *
 * 🎯 이 컴포넌트의 특징:
 * 1. 유연성: 다양한 스타일과 동작 옵션 제공
 * 2. 접근성: HTML footer 요소를 사용하여 시맨틱 마크업 준수
 * 3. 재사용성: 모든 페이지에서 일관된 푸터 스타일 제공
 * 4. 커스터마이징: className prop으로 추가 스타일링 가능
 * 5. 조합 가능: 다른 레이아웃 컴포넌트들과 함께 사용 가능
 *
 * 🏗️ 컴포넌트 구조:
 * Footer (Layout)
 * └── footer element (시맨틱 HTML 요소)
 *     └── children (동적으로 전달되는 콘텐츠)
 *
 * 💡 팁:
 * - fixed 옵션을 사용할 때는 메인 콘텐츠에 하단 패딩을 추가해야 합니다
 * - variant 옵션들은 CSS로 미리 정의된 스타일을 적용합니다
 * - 이 컴포넌트는 Header, Container 등 다른 레이아웃 컴포넌트들과 조합하여 사용할 수 있습니다
 * - 반응형 디자인을 위해 CSS 미디어 쿼리와 함께 사용하는 것을 권장합니다
 * - 푸터에는 일반적으로 저작권 정보, 링크, 연락처 정보가 포함됩니다
 *
 *
 **/
