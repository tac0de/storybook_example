import classNames from 'classnames';

import styles from './ArticleTrendingKeywords.module.scss';

export interface ArticleTrendingKeywordsProps {
  title: string;
  updatedAt: string;
  items: string[];
  className?: string;
}

export function ArticleTrendingKeywords({ title, updatedAt, items, className }: ArticleTrendingKeywordsProps) {
  return (
    <section className={classNames(styles.root, className)}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.timestamp}>{updatedAt}</span>
      </div>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ArticleTrendingKeywords;

