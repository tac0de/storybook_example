import { createHeaderContent } from '../../recipes/headerRecipes';

export const HOME_HEADER_CONTENT = createHeaderContent({
  nav: [
    ['오피니언', 'https://www.joongang.co.kr/opinion'],
    ['정치', 'https://www.joongang.co.kr/politics'],
    ['경제', 'https://www.joongang.co.kr/money'],
    ['사회', 'https://www.joongang.co.kr/society'],
    ['국제', 'https://www.joongang.co.kr/world'],
    ['문화', 'https://www.joongang.co.kr/culture'],
    ['스포츠', 'https://www.joongang.co.kr/sports'],
    ['라이프', 'https://www.joongang.co.kr/lifestyle'],
    ['피플', 'https://www.joongang.co.kr/people'],
  ],
  user: false,
  shortcut: { variant: 'plus' },
  masthead: {
    replicaHref: 'https://www.joongang.co.kr/replica',
    loginHref: '/login',
    joinHref: '/join',
    myNewsHref: 'https://www.joongang.co.kr/mynews',
    languageItems: [
      { label: 'ENG', href: 'https://koreajoongangdaily.joins.com' },
      { label: '中文', href: 'https://chinese.joins.com' },
    ],
  },
});

export const PLUS_HOME_HEADER_CONTENT = createHeaderContent({
  nav: [
    ['콘텐트 탐색', '#'],
    ['시리즈별 보기', '#'],
    ['큐레이션 발견', '#'],
  ],
  user: true,
  shortcut: {
    variant: 'default',
    href: 'https://www.joongang.co.kr',
    ariaLabel: '더중앙 바로가기',
  },
  masthead: {
    replicaHref: 'https://www.joongang.co.kr/replica',
    loginHref: '/login',
    joinHref: '/join',
    myNewsHref: 'https://www.joongang.co.kr/mynews',
  },
});

export const PLUS_SUB_HEADER_CONTENT = createHeaderContent({
  user: true,
  shortcut: {
    variant: 'default',
    href: 'https://www.joongang.co.kr',
    ariaLabel: '더중앙 바로가기',
  },
});

export const SUB_HEADER_CONTENT = createHeaderContent({
  user: false,
  shortcut: {
    variant: 'plusWithoutLogo',
    href: 'https://www.joongang.co.kr/plus',
    ariaLabel: '더중앙플러스 바로가기',
  },
  masthead: {
    replicaHref: 'https://www.joongang.co.kr/replica',
    loginHref: '/login',
    joinHref: '/join',
    myNewsHref: 'https://www.joongang.co.kr/mynews',
  },
});
