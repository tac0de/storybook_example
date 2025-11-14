export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type ArticleFact = {
  label: string;
  value: string;
  description: string;
};

export type ArticleInfoboxItem = {
  label: string;
  value: string;
};

export type ArticleTrendingKeywords = {
  title: string;
  updatedAt: string;
  items: string[];
};

export type ArticleAiGuide = {
  title: string;
  subtitle: string;
  description: string;
  tips: string[];
  prompts: string[];
};

export type ArticlePlusPick = {
  category: string;
  title: string;
  description: string;
  date: string;
};

export type Article = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  publishedAt: string; // ISO string
  category: string;
  location: string;
  heroImage: string;
  tags: string[];
  highlights: string[];
  pullQuote: {
    text: string;
    source: string;
  };
  facts: ArticleFact[];
  infobox: {
    title: string;
    items: ArticleInfoboxItem[];
  };
  related: { title: string; tag: string }[];
  aiGuide: ArticleAiGuide;
  trendingKeywords: ArticleTrendingKeywords;
  mostRead: string[];
  plusPicks: ArticlePlusPick[];
  sections: ArticleSection[];
};

export function getSampleArticle(): Article {
  return {
    id: 'sample-article',
    title: '“이제는 정책이 앞서야 한다”…강남발 전세 반등, 전국으로 번지나',
    subtitle: '서울 강남 재건축 단지부터 경기·부산 신축까지 다시 들썩이는 전세 시장을 르포 형식으로 따라가 봤다.',
    author: '정원석 기자·이정민 영상기자',
    publishedAt: new Date('2024-11-15T06:00:00+09:00').toISOString(),
    category: '부동산',
    location: '서울 서초구 반포동',
    heroImage:
      'https://images.joongang.co.kr/jtbcjoongang/2024/11/article/25381809/hero.jpg',
    tags: ['부동산', '전세', '강남 재건축', '전세보증금'],
    highlights: [
      '강남 재건축 단지 전용 84㎡ 전세, 두 달 새 8천만 원 상승',
      '한국은행 “가계대출 관리” 주문 속 임차인 체감금리 여전히 5%대',
      '정부, 다주택자 전세공급 유도하는 세제 패키지 막바지 조율',
    ],
    pullQuote: {
      text: '“보증금 2억 원을 더 올려줘야 한다는 말에 멍해졌습니다. 매물은 없고, 시간만 흘러요.”',
      source: '서초구 반포동 직장인 A씨',
    },
    facts: [
      { label: '강남 재건축 전세지수', value: '+1.8%', description: '3주 연속 상승 (한국부동산원)' },
      { label: '서울 평균 전세가율', value: '54.2%', description: '6개월 만에 반등' },
      { label: '전세대출 신규금리', value: '5.07%', description: '10월 기준, 시중은행 평균' },
    ],
    aiGuide: {
      title: 'AI 검색 가이드',
      subtitle: 'Smart한 더중앙 검색 활용',
      description: '문장형 질문을 입력하면 AI가 의도를 파악해 참고 기사와 함께 답변을 제안합니다.',
      tips: ['단어 2개 이하 → 일반 키워드 검색', '물음표·문장 포함 → AI 검색으로 자동 연결'],
      prompts: [
        '1980년 5월 비상계엄 관련 기사를 정리해줘',
        '오늘의 국내 주요 뉴스 사진을 모아줄 수 있을까?',
        '깊은 바다 탐사 현황을 최신 기사로 알려줘',
        '부산 전세 시장 상승 이유를 설명해줘',
      ],
    },
    trendingKeywords: {
      title: '트렌드 키워드',
      updatedAt: '09.04 07:00 기준',
      items: ['🍀 운세', '신입생', '상중화일보', '국민배우 성폭행', '신림동 칼부림', 'AI 하라리', '김정은 차번호'],
    },
    mostRead: [
      '여자들 몸까지 닦고 튀었다…술집사장 136명 울린 그놈',
      '“이 과일 냄새 못 맡으면 위험” 초기 치매 뜻밖의 진단법',
      '국민배우 집에서 두 차례 성폭행 당했다…佛 발칵',
      '美 오대호 “천식벨트”로 변신…들끓는 수온이 부른 재앙',
      '[오늘의 운세] 9월 4일',
    ],
    plusPicks: [
      {
        category: 'hello! parents',
        title: '9살에 6개 국어를 썼던 비결',
        description: '모국어 조기 교육으로 집중력을 높인 가족의 이야기',
        date: '2024.05.17 · 가족과 함께',
      },
      {
        category: '세상과 함께',
        title: '앞당겨진 美 대선 TV토론, 황야의 결투 예고',
        description: '이상언의 오늘+가 전한 미국 대선 관전 포인트',
        date: '2024.05.17',
      },
      {
        category: '쉴 땐 뭐하지',
        title: '스무 살 살다간 몰티즈 짱아 이야기',
        description: '펫로스를 달래준 “짱바타”의 정체를 추적하다',
        date: '2024.05.17',
      },
    ],
    infobox: {
      title: '전세 시장 한눈에 보기',
      items: [
        { label: '핵심 지역', value: '서초·강남·송파' },
        { label: '주요 변수', value: '재건축 이주·대출 금리' },
        { label: '정부 대응', value: '전세공급 인센티브, 전세사기 특별단속' },
        { label: '전망', value: '연말까지 강세 유지 가능성↑' },
      ],
    },
    related: [
      { tag: '정책', title: '다주택자 양도세 완화 카드 꺼내드나' },
      { tag: '현장', title: '부산 해운대 신축 전세도 줄줄이 상승' },
      { tag: '데이터', title: '수도권 전세가율 50%선 회복 추이' },
    ],
    sections: [
      {
        id: 'intro',
        title: '반포 아파트 단지, 이주 공백이 만든 되팔림 가격',
        paragraphs: [
          '14일 오전 찾은 서울 서초구 반포동 아파트 단지. 견본주택 앞에 줄을 선 사람들의 손에는 하나같이 등기부등본이 들려 있었다. 이달 초까지만 해도 “조금만 기다리면 떨어질 것”이라던 중개사무소는 “보증금 2억 원을 더 얹어야 한다”고 입을 모았다.',
          '전세 매물이 급격히 줄어든 건 지난 9월부터 다시 본격화된 이주 수요 때문이다. 재건축 공사가 본궤도에 오르면서 기존 세입자들이 일제히 나왔고, 갈 곳을 찾지 못한 세입자들이 인근 단지로 몰리는 모양새다.',
        ],
      },
      {
        id: 'tenant',
        title: '임차인은 여전히 5%대 금리와 싸우는 중',
        paragraphs: [
          '기준금리는 내리지 않았지만 시중은행 전세대출 금리는 이미 5%대로 내려와 “버틸 만하다”는 반응이 나오기 시작했다. 그러나 임차인들이 체감하는 부담은 여전히 크다. 2년 전과 비교하면 보증금과 이자 부담이 동시에 커졌기 때문이다.',
          '한국은행은 3분기 금융안정보고서에서 “가계대출 증가 속도에 다시 속도가 붙을 수 있다”며 정부와 금융권에 선제적인 관리를 주문했다. 정부가 급하게 전세공급 정책을 꺼낸 이유다.',
        ],
      },
      {
        id: 'policy',
        title: '정부, 다주택자 전세공급 인센티브 막바지 조율',
        paragraphs: [
          '국토교통부와 기획재정부는 전세 시장 안정을 위한 “3단계 세제·금융 패키지”를 이르면 이달 중 발표할 예정이다. 핵심은 다주택자의 임대사업 등록 유도와 공공전세 공급 확대다.',
          '세제 인센티브를 통해 민간 전세 물량을 시장에 묶어두고, 공공전세로 취약계층을 보호하는 투트랙 전략이다. 그러나 전문가들은 “실제 시장에 추가 공급이 체감되기까지 최소 6개월 이상 걸릴 것”이라고 내다봤다.',
        ],
      },
      {
        id: 'outlook',
        title: '전문가 “연말까지 강세…지역별 온도차 주의”',
        paragraphs: [
          '부동산 전문가들은 “강남 3구가 끌어올린 반등 압력이 경기·부산 등 주요 광역시로 확산하고 있다”며 “연말까지는 전세가 강세가 이어질 것”이라고 전망했다.',
          '다만 지역별 온도차는 뚜렷하다. 인천·대전 등 일부 지역은 입주 물량이 부담으로 작용해 약세가 이어지고 있다. 전문가들은 “급등 지역일수록 계약서 작성 전에 주변 시세 확인과 전세보증 가입이 필수”라고 강조했다.',
        ],
      },
    ],
  };
}
