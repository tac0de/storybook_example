import classNames from 'classnames';

import styles from './ArticleMostRead.module.scss';

export interface ArticleMostReadProps {
  title?: string;
  items: string[];
  className?: string;
}

export function ArticleMostRead({ title = '많이 본 기사', items, className }: ArticleMostReadProps) {
  return (
    <section className={classNames(styles.root, className)}>
      <h3 className={styles.title}>{title}</h3>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={item} className={styles.item}>
            <span className={styles.rank}>{index + 1}.</span>
            <p className={styles.link}>{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ArticleMostRead;

