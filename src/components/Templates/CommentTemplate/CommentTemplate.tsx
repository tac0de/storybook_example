import styles from './CommentTemplate.module.scss';

import type React from 'react';

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
