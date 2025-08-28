import type { Meta, StoryObj } from '@storybook/react';
import Icon, { type IconProps, type IconName } from './Icon';

const meta: Meta<IconProps> = {
  title: 'Atoms/Icon',
  component: Icon,
  args: {
    name: 'navbar',
    size: 'md',
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'navbar',
        'search',
        'search-gra',
        'search-ai',
        'shortcut-plus',
        'chevron-right',
        'logo-plus',
        'newspaper-black',
      ] satisfies IconName[],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    ariaLabel: { control: false },
  },
};

export default meta;
type Story = StoryObj<IconProps>;

export const Playground: Story = {};

export const Gallery: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(
        [
          'navbar',
          'search',
          'search-gra',
          'search-ai',
          'shortcut-plus',
          'chevron-right',
          'logo-plus',
          'newspaper-black',
        ] as IconName[]
      ).map(n => (
        <Icon key={n} {...args} name={n} ariaLabel={n} />
      ))}
    </div>
  ),
};
