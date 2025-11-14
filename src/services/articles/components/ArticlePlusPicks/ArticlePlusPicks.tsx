import classNames from 'classnames';

import styles from './ArticlePlusPicks.module.scss';

export interface ArticlePlusPickItem {
  category: string;
  title: string;
  description: string;
  date: string;
}

export interface ArticlePlusPicksProps {
  title?: string;
  items: ArticlePlusPickItem[];
  className?: string;
}

export function ArticlePlusPicks({ title = 'The JoongAng Plus', items, className }: ArticlePlusPicksProps) {
  return (
    <section className={classNames(styles.root, className)}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.list}>
        {items.map(item => (
          <article key={item.title} className={styles.card}>
            <span className={styles.category}>{item.category}</span>
            <h4 className={styles.cardTitle}>{item.title}</h4>
            <p className={styles.cardDescription}>{item.description}</p>
            <p className={styles.meta}>{item.date}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ArticlePlusPicks;

