type ScrollLockRecord = {
  count: number;
  previousOverflow: string;
  previousPaddingRight: string;
};

const scrollLockState = new WeakMap<Document, ScrollLockRecord>();

function getDefaultDocument(): Document | null {
  if (typeof document === 'undefined') {
    return null;
  }
  return document;
}

function getScrollbarWidth(doc: Document): number {
  const view = doc.defaultView;
  if (!view) {
    return 0;
  }

  return view.innerWidth - (doc.documentElement?.clientWidth ?? view.innerWidth);
}

function applyLock(doc: Document, record: ScrollLockRecord) {
  const { body } = doc;
  if (!body) {
    return;
  }

  const scrollbarWidth = getScrollbarWidth(doc);
  body.style.overflow = 'hidden';

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  scrollLockState.set(doc, record);
}

function revertLock(doc: Document, record: ScrollLockRecord) {
  const { body } = doc;
  if (!body) {
    return;
  }

  body.style.overflow = record.previousOverflow;
  body.style.paddingRight = record.previousPaddingRight;
  scrollLockState.delete(doc);
}

function unlockBodyScroll(doc: Document) {
  const record = scrollLockState.get(doc);
  if (!record) {
    return;
  }

  record.count -= 1;
  if (record.count <= 0) {
    revertLock(doc, record);
  } else {
    scrollLockState.set(doc, record);
  }
}

export function lockBodyScroll(docParam?: Document | null): () => void {
  const doc = docParam ?? getDefaultDocument();
  const body = doc?.body;

  if (!doc || !body) {
    return () => undefined;
  }

  const existing = scrollLockState.get(doc);
  if (existing) {
    existing.count += 1;
    scrollLockState.set(doc, existing);
  } else {
    const record: ScrollLockRecord = {
      count: 1,
      previousOverflow: body.style.overflow,
      previousPaddingRight: body.style.paddingRight,
    };
    applyLock(doc, record);
  }

  let released = false;
  return () => {
    if (released) {
      return;
    }
    released = true;
    unlockBodyScroll(doc);
  };
}

export function isBodyScrollLocked(docParam?: Document | null): boolean {
  const doc = docParam ?? getDefaultDocument();
  if (!doc) {
    return false;
  }
  const record = scrollLockState.get(doc);
  return Boolean(record && record.count > 0);
}
