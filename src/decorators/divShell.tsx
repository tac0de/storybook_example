import * as React from 'react';
import type { Decorator, StoryContext } from '@storybook/react';

export type DivShellSpec =
  | string[]
  | Array<{ className?: string; id?: string; style?: React.CSSProperties; 'data-testid'?: string }>;

export type DivShellParams = {
  /** 바깥→안쪽 순서의 래퍼 클래스 목록 (ex: ['page', 'layout', 'header_wrap', 'header_nav']) */
  wrappers?: DivShellSpec;
  /** 문서 body에 임시로 부여할 클래스(전역 CSS가 body selector를 요구할 때) */
  bodyClass?: string | string[];
  /** 스토리 캔버스 폭 제한 등 임시 스타일이 필요하면 true → 기본 컨테이너 적용 */
  container?: boolean | React.CSSProperties;
};

/** 내부적으로 배열 정규화 */
function normalize(
  spec?: DivShellSpec
): Array<{ className?: string; id?: string; style?: React.CSSProperties; 'data-testid'?: string }> {
  if (!spec) return [];
  if (Array.isArray(spec) && typeof spec[0] === 'string') {
    return (spec as string[]).map(cls => ({ className: cls }));
  }
  return spec as Array<{ className?: string; id?: string; style?: React.CSSProperties; 'data-testid'?: string }>;
}

/** body class 토글 훅 */
function useBodyClass(bodyClass?: string | string[]) {
  React.useEffect(() => {
    if (!bodyClass) return;
    const list = Array.isArray(bodyClass) ? bodyClass : [bodyClass];
    list.forEach(c => c && document.body.classList.add(c));
    return () => list.forEach(c => c && document.body.classList.remove(c));
  }, [Array.isArray(bodyClass) ? bodyClass.join(' ') : bodyClass]);
}

export function DivShell({
  wrappers,
  children,
  container,
}: {
  wrappers?: DivShellSpec;
  children: React.ReactNode;
  container?: boolean | React.CSSProperties;
}) {
  const specs = normalize(wrappers);

  // 선택: 기본 캔버스 컨테이너 (폭 제한 등)
  const containerProps: React.HTMLAttributes<HTMLDivElement> = container
    ? typeof container === 'object'
      ? { style: container }
      : { style: { maxWidth: 1280, margin: '0 auto', padding: 16 } }
    : {};

  const nested = specs.reduceRight<React.ReactNode>((acc, spec, i) => {
    const key = spec.id || spec.className || `shell-${i}`;
    return (
      <div key={key} id={spec.id} data-testid={spec['data-testid']} className={spec.className} style={spec.style}>
        {acc}
      </div>
    );
  }, children);

  return container ? <div {...containerProps}>{nested}</div> : <>{nested}</>;
}

/**
 * 데코레이터 팩토리
 * - 래퍼 클래스 체인과 bodyClass를 고정으로 주는 버전
 */
export function withDivShell(params: DivShellParams): Decorator {
  return (Story, _ctx) => {
    useBodyClass(params.bodyClass);
    return (
      <DivShell wrappers={params.wrappers} container={params.container}>
        <Story />
      </DivShell>
    );
  };
}

/**
 * 스토리/메타의 parameters.divShell 값을 읽어서 적용하는 글로벌 데코레이터
 * - preview.ts의 decorators 배열에 추가해두면, 각 스토리별 parameters로 제어 가능
 */
export const withDivShellFromParams: Decorator = (Story, ctx: StoryContext) => {
  const params = (ctx.parameters?.divShell || {}) as DivShellParams;
  useBodyClass(params.bodyClass);
  return (
    <DivShell wrappers={params.wrappers} container={params.container}>
      <Story />
    </DivShell>
  );
};
