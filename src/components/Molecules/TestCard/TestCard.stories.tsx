import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestCard } from './TestCard';

const meta: Meta<typeof TestCard> = {
  title: 'Molecules/TestCard',
  component: TestCard,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: '추가 클래스' },
  },
  parameters: {
    interactions: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-blue-100 border-2 border-blue-300',
  },
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <TestCard 
        className="cursor-pointer hover:bg-gray-50"
        onClick={() => setCount(count + 1)}
      >
        클릭 횟수: {count}
      </TestCard>
    );
  },
};