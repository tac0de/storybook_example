import * as React from 'react';
import classNames from 'classnames';

import styles from './ArticleTag.module.scss';
import { useComposedCallback } from '../../../../hooks/useComposedCallback';
import { trackClick } from '../../../analytics';

export interface ArticleTagProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
}

export function ArticleTag({ label, selected, onClick, className, ...rest }: ArticleTagProps) {
  const handleClick = useComposedCallback<Parameters<NonNullable<typeof onClick>>>(
    onClick,
    () => trackClick('ArticleTag Click', { label })
  );

  return (
    <button
      type="button"
      className={classNames(styles.tag, selected && styles.selected, className)}
      onClick={handleClick}
      {...rest}
    >
      <span className={styles.dot} aria-hidden />
      {label}
    </button>
  );
}

export default ArticleTag;
