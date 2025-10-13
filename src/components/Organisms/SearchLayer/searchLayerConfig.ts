import {
  createSearchLayerConfig,
  type SearchLayerConfig,
  type SearchTagLink,
  type SearchTrendKeyword,
} from '../../../recipes/searchLayerRecipes';
export type { SearchLayerConfig, SearchTagLink, SearchTrendKeyword };

export const searchLayerConfig: SearchLayerConfig = createSearchLayerConfig({
  updatedAt: '09.04 07:00 기준',
  desktopTags: [
    '1992년 LA 흑인폭동 사태 당시 상황에 대해 알려주세요',
    '1980년 5월 비상계엄 관련 당시 기사를 찾아주세요',
    '사진과 함께하는 김명호의 중국 근현대',
    '이재명 정부가 AI 강국 실현을 위해 추진하고자 하는 주요 정책은 어떤 것이 있나요?',
    '깊은 바다는 어둠 뿐일까?',
    '평화 오디세이, 중국 AI 혁명 현장을 가다',
    '오늘의 국내 주요 뉴스 사진을 한눈에 볼 수 있나요?',
    '백성호 종교의 삶을 묻다 연재',
    '여야가 합의한 상법 개정안의 핵심 내용과 쟁점은?',
    '2025년 올해 한국의 성장률 전망은?',
    '김호정의 더클래식 in 유럽 연재',
  ],
  carouselSize: 4,
  trendKeywords: [
    { label: '운세', icon: '🍀' },
    '신입생',
    '상중화일보',
    '국민배우 성폭행',
    '신림동 칼부림',
    '술집사장 그놈',
    '엄마 자살',
    '신림동 흉기난동',
    '피자집 칼부림',
    '김건희 영부인',
    { label: 'AI 하라리', eventLabel: '트렌드 키워드_AI 하라리' },
    '김정은 차번호',
  ],
  searchOptions: {
    baseHref: 'https://www.joongang.co.kr/aisearch',
  },
  trendOptions: {
    baseHref: 'https://www.joongang.co.kr/search',
  },
});
