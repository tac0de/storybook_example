import { useEffect } from 'react';
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
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useSearchLayerState } from './useSearchLayerState';

export type SearchLayerProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (q: string) => void;
  inputBoxIsShow?: boolean;
};

export default function SearchLayer({ open, onClose, onSubmit, inputBoxIsShow = true }: SearchLayerProps) {
  const { layerRef, placeholderHidden, handleSubmit, handleSearchInput, close, reset, clearButtonVisible } =
    useSearchLayerState({
      open,
      onClose,
      onSubmit,
    });
  useEscapeKey(close, open);
  useBodyScrollLock(open);
  useFocusTrap(layerRef, open);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <div
      style={{ zIndex: 1000 }}
      className={cx('full_popup', 'bg_white', 'search_popup', open ? 'show' : 'hide')}
      id="layer_search"
      tabIndex={0}
    >
      <div className="layer_popup layer_search layer_search_plus search_ai" ref={layerRef}>
        <SearchLayerHeader onClose={close} />

        <div className="layer_body" style={{ paddingBottom: 0 }}>
          <SearchLayerForm
            placeholderHidden={placeholderHidden}
            onSubmit={handleSubmit}
            onInput={handleSearchInput}
            onClear={reset}
            showClearButton={clearButtonVisible}
          />
          <SearchLayerInputSection />
          <SearchLayerAiTagSection />
          <SearchLayerTrendSection />
          <SearchLayerInfoBox inputBoxIsShow={inputBoxIsShow} />
          <SearchLayerMostViewed />
          <SearchLayerPlusSection />
        </div>
      </div>
    </div>
  );
}
