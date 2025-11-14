import * as React from 'react';
import classNames from 'classnames';

import styles from './ArticlePage.module.scss';
import { getSampleArticle } from '../../articleData';
import { ArticleTag } from '../../components/ArticleTag/ArticleTag';
import { ArticleSearchInput } from '../../components/ArticleSearchInput/ArticleSearchInput';
import { ArticleTOCOverlay } from '../../components/ArticleTOCOverlay/ArticleTOCOverlay';
import { ArticleTrendingKeywords } from '../../components/ArticleTrendingKeywords/ArticleTrendingKeywords';
import { ArticleMostRead } from '../../components/ArticleMostRead/ArticleMostRead';
import { ArticleAiPromptPanel } from '../../components/ArticleAiPromptPanel/ArticleAiPromptPanel';
import { ArticlePlusPicks } from '../../components/ArticlePlusPicks/ArticlePlusPicks';
import { useBoolean } from '../../../../hooks/useBoolean';
import { useLatest } from '../../../../hooks/useLatest';
import { useEventListener } from '../../../../hooks/useEventListener';
import { useSearchSubmit } from '../../../../hooks/useSearchSubmit';

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  } catch {
    return iso;
  }
}

const engagementStats = [
  { label: '조회', value: '12.4K', description: '기사 공개 18시간 기준' },
  { label: '댓글', value: '328', description: '커뮤니티 + 기사 댓글 총합' },
  { label: '스크랩', value: '1.2K', description: 'JoongAng 멤버십 저장 수' },
];

export function ArticlePage() {
  const article = React.useMemo(() => getSampleArticle(), []);
  const readingMode = useBoolean(true);
  const { handleSubmit: submitSearch } = useSearchSubmit();
  const [query, setQuery] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState(article.sections[0]?.id ?? '');
  const searchCtaPrompt = '강남 전세 시장 요약해줘';

  const toc = React.useMemo(
    () => article.sections.map(s => ({ id: s.id, title: s.title })),
    [article.sections]
  );

  const sectionsRef = useLatest(article.sections);

  const windowTarget = React.useCallback(() => (typeof window !== 'undefined' ? window : null), []);

  useEventListener(windowTarget, 'scroll', () => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - doc.clientHeight;
    const progress = maxScroll > 0 ? (doc.scrollTop / maxScroll) * 100 : 100;
    setScrollProgress(Number(progress.toFixed(2)));

    const sections = sectionsRef.current;
    let currentId = sections[0]?.id ?? '';
    for (const section of sections) {
      const node = document.getElementById(section.id);
      if (!node) continue;
      const rect = node.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.35) {
        currentId = section.id;
      } else {
        break;
      }
    }
    if (currentId) {
      setActiveSection(currentId);
    }
  });

  const handleNavigate = (id: string) => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredSections = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const tag = selectedTag?.toLowerCase();
    return article.sections.filter(sec => {
      const textMatches =
        !q || sec.title.toLowerCase().includes(q) || sec.paragraphs.some(p => p.toLowerCase().includes(q));
      const tagMatches =
        !tag ||
        sec.title.toLowerCase().includes(tag) ||
        sec.paragraphs.some(p => p.toLowerCase().includes(tag));
      return textMatches && tagMatches;
    });
  }, [article.sections, query, selectedTag]);

  const handlePromptSelect = React.useCallback(
    (prompt: string) => {
      submitSearch(prompt);
    },
    [submitSearch]
  );

  return (
    <div className={styles.page} data-reading-mode={readingMode.value ? 'serif' : 'sans'}>
      <div className={styles.progressBar} aria-hidden>
        <span className={styles.progressValue} style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className={styles.brandBar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>중앙일보</span>
          <span className={styles.brandEdition}>JoongAng Insight Edition</span>
        </div>
        <div className={styles.brandMeta}>
          <span>{article.category}</span>
          <span className={styles.metaDivider}>|</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span className={styles.metaDivider}>|</span>
          <span>{article.location}</span>
          <div className={styles.brandActions}>
            <button type="button" className={styles.actionButton} onClick={readingMode.toggle}>
              본문 서체 · {readingMode.value ? '명조' : '고딕'}
            </button>
            <button type="button" className={styles.actionButton} onClick={() => handlePromptSelect(searchCtaPrompt)}>
              AI 검색 실행
            </button>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>JoongAng Feature</p>
        <h1 className={styles.title}>{article.title}</h1>
        {article.subtitle && <p className={styles.subtitle}>{article.subtitle}</p>}
        <div className={styles.metaRow}>
          <span>By {article.author}</span>
          <span className={styles.metaDivider}>|</span>
          <span>{article.location}</span>
        </div>
        {article.highlights.length > 0 && (
          <ul className={styles.heroHighlights}>
            {article.highlights.map(highlight => (
              <li key={highlight} className={styles.heroHighlight}>
                {highlight}
              </li>
            ))}
          </ul>
        )}
        <div
          className={styles.heroImage}
          role="img"
          aria-label={`${article.category} 대표 이미지`}
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.45), rgba(0,0,0,0)) , url(${article.heroImage})`,
          }}
        />
      </section>

      <section className={styles.utilityBar}>
        <ArticleSearchInput onDebouncedChange={setQuery} aria-label="본문 검색" />
        <div className={styles.utilityActions}>
          {engagementStats.map(stat => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statNumber}>{stat.value}</span>
              <small>{stat.label}</small>
              <p className={styles.statMeta}>{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        <main className={styles.content}>
          {filteredSections.map((sec, index) => (
            <React.Fragment key={sec.id}>
              <section
                className={classNames(styles.section, activeSection === sec.id && styles.sectionActive)}
                aria-labelledby={`${sec.id}-title`}
              >
                <p className={styles.sectionLead}>On Site</p>
                <h2 id={sec.id} className={styles.sectionTitle}>
                  {sec.title}
                </h2>
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} className={styles.paragraph}>
                    {p}
                  </p>
                ))}
              </section>
              {index === 0 && article.pullQuote && (
                <blockquote className={styles.pullQuote}>
                  <span className={styles.pullQuoteMark} aria-hidden>
                    “
                  </span>
                  <p>{article.pullQuote.text}</p>
                  <cite>{article.pullQuote.source}</cite>
                </blockquote>
              )}
            </React.Fragment>
          ))}

          {article.facts.length > 0 && (
            <section className={styles.section} aria-label="데이터 포인트">
              <p className={styles.sectionLead}>Data Watch</p>
              <h2 className={styles.sectionTitle}>전세 시장 핵심 지표</h2>
              <div className={styles.factGrid}>
                {article.facts.map(fact => (
                  <article key={fact.label} className={styles.factCard}>
                    <span className={styles.factLabel}>{fact.label}</span>
                    <strong className={styles.factValue}>{fact.value}</strong>
                    <p className={styles.factDescription}>{fact.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className={styles.aside}>
          <div className={styles.asideCard}>
            <h3 className={styles.asideHeading}>연결된 키워드</h3>
            <div className={styles.tags}>
              {article.tags.map(tag => (
                <ArticleTag
                  key={tag}
                  label={tag}
                  selected={selectedTag === tag}
                  onClick={() => setSelectedTag(prev => (prev === tag ? null : tag))}
                />
              ))}
            </div>
          </div>

          <div className={styles.asideCard}>
            <p className={styles.activeSectionLabel}>Now Reading</p>
            <p className={styles.activeSectionTitle}>
              {toc.find(item => item.id === activeSection)?.title ?? toc[0]?.title}
            </p>
            <ArticleTOCOverlay items={toc} onNavigate={handleNavigate} />
          </div>

          <div className={styles.asideCard}>
            <h3 className={styles.asideHeading}>{article.infobox.title}</h3>
            <dl className={styles.infoboxList}>
              {article.infobox.items.map(item => (
                <div key={item.label} className={styles.infoboxItem}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ArticleTrendingKeywords
            className={styles.asideCard}
            title={article.trendingKeywords.title}
            updatedAt={article.trendingKeywords.updatedAt}
            items={article.trendingKeywords.items}
          />

          <ArticleAiPromptPanel
            className={classNames(styles.asideCard, styles.aiCard)}
            title={article.aiGuide.title}
            subtitle={article.aiGuide.subtitle}
            description={article.aiGuide.description}
            tips={article.aiGuide.tips}
            prompts={article.aiGuide.prompts}
            onSelectPrompt={handlePromptSelect}
          />

          <ArticleMostRead className={styles.asideCard} items={article.mostRead} />

          <ArticlePlusPicks className={styles.asideCard} items={article.plusPicks} />

          <div className={styles.asideCard}>
            <h3 className={styles.asideHeading}>공유</h3>
            <div className={styles.shareRow}>
              <button type="button" className={classNames(styles.shareButton, styles.shareButtonAlt)}>
                Kakao
              </button>
              <button type="button" className={styles.shareButton}>
                Copy URL
              </button>
            </div>
            <div className={styles.searchCTA}>
              <p>AI 검색으로 관련 기사까지 한 번에 살펴보세요.</p>
              <button type="button" onClick={() => handlePromptSelect(searchCtaPrompt)}>
                AI 검색 실행
              </button>
            </div>
          </div>

          <div className={styles.asideCard}>
            <h3 className={styles.asideHeading}>Related</h3>
            <ul className={styles.relatedList}>
              {article.related.map(item => (
                <li key={item.title} className={styles.relatedItem}>
                  <span className={styles.relatedTag}>{item.tag}</span>
                  <p>{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <p className={styles.floatingTagline}>JoongAng Ilbo · Premium Report</p>

    </div>
  );
}

export default ArticlePage;
