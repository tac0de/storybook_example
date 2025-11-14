import classNames from 'classnames';

import styles from './ArticleAiPromptPanel.module.scss';

export interface ArticleAiPromptPanelProps {
  title: string;
  subtitle: string;
  description: string;
  tips: string[];
  prompts: string[];
  onSelectPrompt?: (prompt: string) => void;
  className?: string;
}

export function ArticleAiPromptPanel({
  title,
  subtitle,
  description,
  tips,
  prompts,
  onSelectPrompt,
  className,
}: ArticleAiPromptPanelProps) {
  return (
    <section className={classNames(styles.root, className)}>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.description}>{description}</p>
      </div>
      {tips.length > 0 && (
        <ul className={styles.tips}>
          {tips.map(tip => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      )}
      <div className={styles.prompts}>
        {prompts.map(prompt => (
          <button key={prompt} type="button" className={styles.prompt} onClick={() => onSelectPrompt?.(prompt)}>
            {prompt}
          </button>
        ))}
      </div>
    </section>
  );
}

export default ArticleAiPromptPanel;

