/**
 * 🎓 SortSelector 컴포넌트 학습 가이드
 * 
 * 이 파일은 React + TypeScript로 만든 재사용 가능한 SortSelector 컴포넌트입니다.
 * 정렬 옵션을 선택할 수 있는 드롭다운 컴포넌트로, 목록이나 데이터를 다양한 기준으로 정렬할 때 사용됩니다.
 * HTML select 요소를 기반으로 하며, 커스텀 스타일링이 적용된 Molecules 레벨 컴포넌트입니다.
 * 초보자를 위해 각 부분에 상세한 주석을 추가했습니다.
 */

// React 라이브러리에서 필요한 기능들을 가져옵니다
import React from 'react';

// classnames 라이브러리를 가져와서 CSS 클래스를 동적으로 조합할 수 있게 합니다
// bind 함수를 사용하면 CSS Modules와 함께 사용할 때 더 편리합니다
import classNames from 'classnames/bind';

// 이 컴포넌트의 스타일을 가져옵니다
// CSS Modules를 사용하므로 클래스명이 자동으로 고유화됩니다
import styles from './SortSelector.module.scss';

// classnames의 bind 함수를 사용하여 스타일 객체와 바인딩합니다
// 이렇게 하면 cx('sort-selector') 같은 방식으로 클래스를 조합할 수 있습니다
const cx = classNames.bind(styles);

/**
 * 🎯 정렬 옵션을 정의하는 인터페이스
 * 
 * 각 정렬 옵션은 value(실제 값)와 label(표시될 텍스트)을 가집니다.
 * 이렇게 분리함으로써 내부 로직과 사용자에게 보여지는 텍스트를 독립적으로 관리할 수 있습니다.
 */
export interface SortOption {
  /**
   * 🔑 정렬 옵션의 실제 값입니다
   * 이 값은 내부 로직에서 사용되며, 예를 들어 'newest', 'oldest', 'popular' 등이 될 수 있습니다
   */
  value: string;

  /**
   * 🏷️ 사용자에게 표시될 텍스트입니다
   * 이 값은 사용자 인터페이스에 표시되며, 예를 들어 '최신순', '오래된순', '인기순' 등이 될 수 있습니다
   */
  label: string;
}

/**
 * 🎯 SortSelector 컴포넌트의 Props 인터페이스 정의
 * 
 * TypeScript를 사용하여 컴포넌트가 받을 수 있는 속성들을 명확하게 정의합니다.
 * 이렇게 하면 타입 안전성과 자동완성을 보장할 수 있습니다.
 */
export interface SortSelectorProps {
  /**
   * 🎯 현재 선택된 정렬 옵션의 값입니다
   * 이 값은 제어 컴포넌트(Controlled Component) 패턴을 사용하여 부모 컴포넌트에서 관리됩니다
   */
  value: string;

  /**
   * 📋 선택할 수 있는 정렬 옵션들의 배열입니다
   * 각 옵션은 SortOption 인터페이스를 따르며, value와 label을 가집니다
   */
  options: SortOption[];

  /**
   * 🔄 정렬 옵션이 변경될 때 호출되는 콜백 함수입니다
   * 사용자가 다른 옵션을 선택했을 때 부모 컴포넌트에 알리는 데 사용됩니다
   * @param value - 새로 선택된 정렬 옵션의 값
   */
  onChange?: (value: string) => void;

  /**
   * 🎨 추가적인 CSS 클래스를 적용할 수 있습니다
   * 컴포넌트의 기본 스타일을 유지하면서 추가 스타일링이 가능합니다
   */
  className?: string;
}

/**
 * 🚀 SortSelector 컴포넌트 정의
 * 
 * React.FC는 "Function Component"의 줄임말로, 함수형 컴포넌트임을 명시합니다.
 * <SortSelectorProps>는 이 컴포넌트가 SortSelectorProps 타입의 props를 받는다는 의미입니다.
 * 
 * 이 컴포넌트는 HTML select 요소를 기반으로 하며, 커스텀 스타일링이 적용되어 있습니다.
 */
export const SortSelector: React.FC<SortSelectorProps> = ({
  // 🎯 Props 구조 분해 할당 (Destructuring Assignment)
  value,                     // 현재 선택된 값 (필수)
  options,                   // 정렬 옵션 배열 (필수)
  onChange,                  // 변경 핸들러 (선택적)
  className,                 // 추가 CSS 클래스 (선택적)
}) => {
  /**
   * 🔄 정렬 옵션 변경 핸들러
   * 
   * 사용자가 드롭다운에서 다른 옵션을 선택했을 때 실행되는 함수입니다.
   * HTML select 요소의 onChange 이벤트를 처리하고, 부모 컴포넌트에 새로운 값을 전달합니다.
   * 
   * @param e - React의 ChangeEvent 객체 (select 요소의 변경 이벤트)
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 🎯 onChange 함수가 전달되었다면 새로운 값으로 호출
    // 옵셔널 체이닝(?.)을 사용하여 onChange가 undefined일 때도 안전하게 처리
    onChange?.(e.target.value);
  };

  /**
   * 🎨 JSX 반환
   * 
   * React 컴포넌트는 JSX를 반환해야 합니다.
   * 여기서는 정렬 선택기를 포함하는 컨테이너를 반환합니다.
   */
  return (
    <div className={cx('sort-selector', className)}>
      {/* 📋 정렬 옵션 선택 드롭다운 */}
      <select
        value={value}                    // 현재 선택된 값
        onChange={handleChange}          // 변경 핸들러
        className={cx('sort-select')}    // 드롭다운 전용 CSS 클래스
      >
        {/* 📝 정렬 옵션들을 동적으로 렌더링 */}
        {options.map((option) => (
          <option 
            key={option.value}           // React의 key prop (고유 식별자)
            value={option.value}         // 옵션의 실제 값
          >
            {option.label}               {/* 사용자에게 표시될 텍스트 */}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * 📝 사용 예시:
 * 
 * // 기본 사용법
 * const sortOptions = [
 *   { value: 'newest', label: '최신순' },
 *   { value: 'oldest', label: '오래된순' },
 *   { value: 'popular', label: '인기순' },
 *   { value: 'name', label: '이름순' }
 * ];
 * 
 * <SortSelector 
 *   value={currentSort} 
 *   options={sortOptions} 
 *   onChange={setCurrentSort} 
 * />
 * 
 * // 댓글 정렬용
 * const commentSortOptions = [
 *   { value: 'recent', label: '최근 댓글' },
 *   { value: 'oldest', label: '오래된 댓글' },
 *   { value: 'likes', label: '좋아요 많은 순' }
 * ];
 * 
 * <SortSelector 
 *   value={commentSort} 
 *   options={commentSortOptions} 
 *   onChange={handleCommentSortChange} 
 * />
 * 
 * // 제품 정렬용
 * const productSortOptions = [
 *   { value: 'price-low', label: '가격 낮은순' },
 *   { value: 'price-high', label: '가격 높은순' },
 *   { value: 'rating', label: '평점순' },
 *   { value: 'sales', label: '판매순' }
 * ];
 * 
 * <SortSelector 
 *   value={productSort} 
 *   options={productSortOptions} 
 *   onChange={handleProductSortChange} 
 * />
 * 
 * 🎯 이 컴포넌트의 특징:
 * 1. 유연성: 다양한 정렬 옵션을 props로 쉽게 설정 가능
 * 2. 재사용성: 여러 곳에서 다른 정렬 옵션으로 사용 가능
 * 3. 타입 안전성: TypeScript로 옵션 구조를 명확하게 정의
 * 4. 접근성: HTML select 요소를 사용하여 기본 접근성 보장
 * 5. 커스터마이징: CSS 클래스로 스타일링 가능
 * 
 * 🏗️ 컴포넌트 구조:
 * SortSelector (Molecules)
 * └── HTML select element (기본 HTML 요소)
 *     └── option elements (동적으로 생성)
 * 
 * 💡 팁:
 * - value와 label을 분리함으로써 다국어 지원이 용이합니다
 * - onChange 핸들러에서 실제 정렬 로직을 구현하면 됩니다
 * - CSS로 select 요소의 스타일을 커스터마이징할 수 있습니다
 */ 