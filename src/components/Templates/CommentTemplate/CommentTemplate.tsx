import styles from './CommentTemplate.module.scss';

import type React from 'react';

/**
 * CommentTemplate 컴포넌트의 props를 정의합니다.
 */
export interface CommentTemplateProps {
  /** 헤더 영역 */
  readonly header?: React.ReactNode;
  /** 본문 영역 */
  readonly children: React.ReactNode;
  /** 푸터 영역 */
  readonly footer?: React.ReactNode;
  /** 추가 클래스 */
  readonly className?: string;
}

/**
 * 댓글 페이지의 전체적인 레이아웃 구조를 정의하는 템플릿(Template) 컴포넌트입니다.
 * 헤더, 본문(children), 푸터 영역으로 구성됩니다.
 * @param {CommentTemplateProps} props - 댓글 템플릿 컴포넌트의 props.
 * @returns {React.ReactElement} - 렌더링된 댓글 템플릿 컴포넌트.
 */
export const CommentTemplate: React.FC<CommentTemplateProps> = ({
  header = null,
  children,
  footer = null,
  className = '',
}) => {
  return (
    <div
      className={[styles.commentTemplate, className].filter(Boolean).join(' ')}
    >
      {header !== null && <div className={styles.header}>{header}</div>}
      <main className={styles.body}>{children}</main>
      {footer !== null && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
