import { searchLayerConfig } from '../../../Organisms/SearchLayer/searchLayerConfig';
import SearchTagLinkList from '../SearchTagLinkList/SearchTagLinkList';

export default function SearchLayerAiTagSection() {
  const { desktop, carousel } = searchLayerConfig.aiTags;

  return (
    <div className="search_tag_wrap ai_tag_list">
      <strong className="title">새로운 AI 검색을 경험해보세요!</strong>

      <SearchTagLinkList links={desktop} className="tag_nav sm_hidden" itemClassName="nav_item" />

      <div className="jswiper jaswiper_controller lg_hidden" style={{ overflow: 'hidden' }}>
        <div
          className="jaswiper_wrap"
          style={{
            animationTimingFunction: 'ease-out',
            overflow: 'visible',
            transitionDuration: '0ms',
            transform: 'translate3d(0px, 0px, 0px)',
          }}
        >
          {carousel.map((group, index) => (
            <SearchTagLinkList key={index} links={group} className="tag_nav" itemClassName="nav_item" />
          ))}
        </div>

        <div className="jswiper_pagination bullet_indicator lg_hidden">
          {carousel.map((_, index) => (
            <span key={index} className={`bullet${index === 0 ? ' active' : ''}`}></span>
          ))}
        </div>
      </div>
    </div>
  );
}
