import { render, screen } from '@testing-library/react';
import { CommentTemplate } from './CommentTemplate';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

/**
 * CommentTemplate 컴포넌트에 대한 테스트 스위트입니다.
 * 이 테스트는 템플릿의 주요 영역(헤더, 본문, 푸터)이 올바르게 렌더링되는지 확인합니다.
 */
describe('CommentTemplate', () => {
  /**
   * `header`, `children`, `footer` prop으로 전달된 내용이 각 영역에 올바르게 렌더링되는지 테스트합니다.
   */
  it('renders header, body, footer', () => {
    render(
      <CommentTemplate header='헤더' footer='푸터'>
        본문
      </CommentTemplate>
    );
    expect(screen.getByText('헤더')).toBeInTheDocument();
    expect(screen.getByText('본문')).toBeInTheDocument();
    expect(screen.getByText('푸터')).toBeInTheDocument();
  });
});
