import { searchLayerConfig } from '../../../Organisms/SearchLayer/searchLayerConfig';
import SearchTagLinkList from '../SearchTagLinkList/SearchTagLinkList';

export default function SearchLayerTrendSection() {
  return (
    <section className="search_tag_wrap">
      <div className="title_wrap">
        <strong className="title">트렌드 키워드</strong>
        <span>{searchLayerConfig.updatedAt}</span>
      </div>
      <SearchTagLinkList links={searchLayerConfig.trendKeywords} className="tag_nav" itemClassName="nav_item" />
    </section>
  );
}
