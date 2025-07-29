import { render, screen } from '@testing-library/react';
import { TestCard } from './TestCard';

describe('TestCard', () => {
  it('renders correctly', () => {
    render(<TestCard />);
    expect(screen.getByText('TestCard')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<TestCard className={customClass} />);
    const element = screen.getByText('TestCard');
    expect(element.parentElement).toHaveClass(customClass);
  });
});