import { render, screen } from '@testing-library/react';
import { TestButton } from './TestButton';

describe('TestButton', () => {
  it('renders correctly', () => {
    render(<TestButton />);
    expect(screen.getByText('TestButton')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<TestButton className={customClass} />);
    const element = screen.getByText('TestButton');
    expect(element.parentElement).toHaveClass(customClass);
  });
});