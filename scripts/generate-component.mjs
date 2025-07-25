import fs from 'fs';
import path from 'path';

const componentTemplate = (componentName) => `import styles from './${componentName}.module.scss';
import type React from 'react';

export interface ${componentName}Props {
  readonly className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ className }) => {
  return (
    <div className={[styles.${componentName.toLowerCase()}, className].filter(Boolean).join(' ')}>
      ${componentName}
    </div>
  );
};
`;

const storiesTemplate = (componentName, atomicType) => `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta = {
  title: '${atomicType}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
`;

const testTemplate = (componentName) => `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName}')).toBeInTheDocument();
  });
});
`;

const scssTemplate = (componentName) => `.${componentName.toLowerCase()} {
  /* Add your styles here */
}
`;

const indexTemplate = (componentName) => `export * from './${componentName}';
`;

const atomicTypes = ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'];

const main = () => {
  const [atomicType, componentName] = process.argv.slice(2);

  if (!atomicType || !componentName) {
    console.error('Usage: npm run generate:component <AtomicType> <ComponentName>');
    console.error('Example: npm run generate:component Atoms MyButton');
    process.exit(1);
  }

  if (!atomicTypes.includes(atomicType)) {
    console.error(`Invalid atomic type: ${atomicType}`);
    console.error(`Available types: ${atomicTypes.join(', ')}`);
    process.exit(1);
  }

  const componentDir = path.join('src', 'components', atomicType, componentName);

  if (fs.existsSync(componentDir)) {
    console.error(`Component ${componentName} already exists at ${componentDir}`);
    process.exit(1);
  }

  fs.mkdirSync(componentDir, { recursive: true });

  const files = {
    [`${componentName}.tsx`]: componentTemplate(componentName),
    [`${componentName}.stories.tsx`]: storiesTemplate(componentName, atomicType),
    [`${componentName}.test.tsx`]: testTemplate(componentName),
    [`${componentName}.module.scss`]: scssTemplate(componentName),
    [`${componentName}.module.scss.d.ts`]: `export declare const ${componentName.toLowerCase()}: string;\n`,
    ['index.ts']: indexTemplate(componentName),
  };

  for (const [fileName, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(componentDir, fileName), content);
  }

  console.log(`Successfully created component ${componentName} at ${componentDir}`);
};

main();
