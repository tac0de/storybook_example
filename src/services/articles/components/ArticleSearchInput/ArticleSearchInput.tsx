import * as React from 'react';

import styles from './ArticleSearchInput.module.scss';
import { useDebouncedValue } from '../../../../hooks/useDebouncedValue';

export interface ArticleSearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  delay?: number;
  onDebouncedChange?: (value: string) => void;
}

export function ArticleSearchInput({ delay = 300, onDebouncedChange, ...rest }: ArticleSearchInputProps) {
  const [value, setValue] = React.useState('');
  const debounced = useDebouncedValue(value, delay);

  React.useEffect(() => {
    onDebouncedChange?.(debounced);
  }, [debounced, onDebouncedChange]);

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.48-5.34C15.23 5.01 12.44 2.5 9 2.5S2.77 5.01 2.09 8.39c-.86 4.29 2.43 8.11 6.7 8.11 1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6.5 0C6.01 14 4 11.99 4 9.5S6.01 5 8.5 5 13 7.01 13 9.5 10.99 14 8.5 14Z"
        />
      </svg>
      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        placeholder="본문 검색 (디바운스)"
        {...rest}
      />
    </div>
  );
}

export default ArticleSearchInput;
