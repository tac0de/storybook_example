export type AnalyticsEvent = {
  name: string;
  payload?: Record<string, unknown>;
};

export function track({ name, payload }: AnalyticsEvent): void {
  // 데모용: 실제 전송 대신 콘솔 출력
  // 실제 서비스에서는 이 자리에 GA/SDK 호출을 연결하세요.
  // eslint-disable-next-line no-console
  console.log(`[track] ${name}`, payload ?? {});
}

export function trackClick(name: string, payload?: Record<string, unknown>): void {
  track({ name, payload: { category: 'click', ...payload } });
}

export default {
  track,
  trackClick,
};

