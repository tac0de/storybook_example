import { useState, type FormEvent } from 'react';
import cx from 'classnames';

import {
  SearchLayerAiTagSection,
  SearchLayerForm,
  SearchLayerHeader,
  SearchLayerInfoBox,
  SearchLayerInputSection,
  SearchLayerMostViewed,
  SearchLayerPlusSection,
  SearchLayerTrendSection,
} from '../../Molecules/SearchLayer';

export type SearchLayerProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (q: string) => void;
};

export default function SearchLayer({ open, onClose, onSubmit }: SearchLayerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderHidden, setPlaceholderHidden] = useState(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  const handleSearchInput = (event: FormEvent<HTMLParagraphElement>) => {
    const value = event.currentTarget.textContent ?? '';
    setSearchQuery(value);
    setPlaceholderHidden(value !== '');
  };

  return (
    <div
      style={{ zIndex: 1000 }}
      className={cx('full_popup', 'bg_white', 'search_popup', open ? 'show' : 'hide')}
      id="layer_search"
      tabIndex={0}
    >
      <div className="layer_popup layer_search layer_search_plus search_ai">
        <SearchLayerHeader onClose={onClose} />

        <div className="layer_body" style={{ paddingBottom: 0 }}>
          <SearchLayerForm placeholderHidden={placeholderHidden} onSubmit={handleSubmit} onInput={handleSearchInput} />
          <SearchLayerInputSection />
          <SearchLayerAiTagSection />
          <SearchLayerTrendSection />
          <SearchLayerInfoBox />
          <SearchLayerMostViewed />
          <SearchLayerPlusSection />
        </div>
      </div>
    </div>
  );
}
