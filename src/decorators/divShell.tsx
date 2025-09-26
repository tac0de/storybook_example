import * as React from 'react';
import type { Decorator } from '@storybook/react';

type Tag = keyof React.JSX.IntrinsicElements;

export type WrapperInput =
  | string
  | {
      tag?: Tag; // ← 직관적 태그 지정
      as?: Tag; // ← tag 대체 표기 허용
      className?: string;
      id?: string;
      style?: React.CSSProperties;
      ['data-testid']?: string;
    };

export type DivShellParams = {
  /** 바깥→안쪽 래퍼들 */
  wrappers?: WrapperInput[];
  /** wrappers에서 tag 미지정 시 기본 태그 */
  defaultTag?: Tag;
  /** 본(innermost) 래퍼 옵션 */
  root?: {
    enabled?: boolean;
    tag?: Tag;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    ['data-testid']?: string;
  };
};

type Norm = {
  tag: Tag | 'body';
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  ['data-testid']?: string;
};

/** nested ternary 없이 정규화 */
function normalize(wrappers?: WrapperInput[], defaultTag: Tag = 'div'): Norm[] {
  if (!wrappers || wrappers.length === 0) return [];
  const out: Norm[] = [];
  for (const w of wrappers) {
    if (typeof w === 'string') {
      out.push({ tag: defaultTag, className: w });
    } else {
      const tag = (w.as ?? w.tag ?? defaultTag) as Tag | 'body';
      out.push({
        tag,
        className: w.className,
        id: w.id,
        style: w.style,
        'data-testid': w['data-testid'],
      });
    }
  }
  return out;
}

/** body 클래스 토글 훅 (ESLint-safe deps) */
function useBodyClassToggle(entries: Array<{ enabled: boolean; className?: string }>) {
  // entries가 바뀔 때만 실행되도록 안정 키 생성
  const depsKey = React.useMemo(
    () => entries.map(e => `${e.enabled ? 1 : 0}:${e.className ?? ''}`).join('|'),
    [entries]
  );

  React.useEffect(() => {
    const added: string[] = [];
    for (const e of entries) {
      if (e.enabled && e.className) {
        document.body.classList.add(e.className);
        added.push(e.className);
      }
    }
    return () => {
      for (const cls of added) document.body.classList.remove(cls);
    };
  }, [depsKey, entries]);
}

/** 바깥→안쪽 래퍼 + 본(innermost) 래퍼까지 지원 */
export const DivShell: React.FC<React.PropsWithChildren<DivShellParams>> = ({
  wrappers,
  defaultTag = 'div',
  root,
  children,
}) => {
  const specs = React.useMemo(() => normalize(wrappers, defaultTag), [wrappers, defaultTag]);

  // body 태그만 모아서 토글
  const bodyEntries = React.useMemo(
    () => specs.map(s => ({ enabled: s.tag === 'body', className: s.className })),
    [specs]
  );
  useBodyClassToggle(bodyEntries);

  // 본(innermost) 래퍼 구성
  const inner = React.useMemo(() => {
    if (!root?.enabled) return children;
    const Tag = (root.tag ?? 'div') as Tag;
    return (
      <Tag id={root.id} className={root.className} style={root.style} data-testid={root['data-testid'] as any}>
        {children}
      </Tag>
    );
  }, [root, children]);

  // 바깥→안쪽으로 감싸되, tag==='body'는 스킵(클래스만 위 훅에서 처리됨)
  const nested = React.useMemo(() => {
    return specs.reduceRight<React.ReactNode>((acc, s, i) => {
      if (s.tag === 'body') return acc;
      const Tag = s.tag as Tag;
      const key = s.id || s.className || `shell-${i}`;
      return (
        <Tag key={key} id={s.id} className={s.className} style={s.style} data-testid={s['data-testid'] as any}>
          {acc}
        </Tag>
      );
    }, inner);
  }, [specs, inner]);

  return <>{nested}</>;
};
DivShell.displayName = 'DivShell';

export function withDivShell(params: DivShellParams = {}): Decorator {
  const WithDivShellDecorator: Decorator = Story => (
    <DivShell wrappers={params.wrappers} defaultTag={params.defaultTag} root={params.root}>
      <Story />
    </DivShell>
  );
  (WithDivShellDecorator as any).displayName = 'withDivShell';
  return WithDivShellDecorator;
}
