import { render, screen } from '@testing-library/react';
import { TestLayout } from './TestLayout';

describe('TestLayout', () => {
  it('renders correctly', () => {
    render(<TestLayout />);
    expect(screen.getByText('TestLayout')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<TestLayout className={customClass} />);
    const element = screen.getByText('TestLayout');
    expect(element.parentElement).toHaveClass(customClass);
  });
});