import fs from 'fs';
import path from 'path';

// 컴포넌트 타입별 템플릿 함수들
const getComponentTemplate = (componentName, atomicType) => {
  const baseProps = `export interface ${componentName}Props {
  readonly className?: string;
}`;

  const baseComponent = `export const ${componentName}: React.FC<${componentName}Props> = ({ className = '' }) => {
  return (
    <div className={\`p-4 bg-white rounded-lg shadow-sm \${className}\`}>
      ${componentName}
    </div>
  );
};`;

  // Atomic Type별 특화된 템플릿
  const templates = {
    Atoms: `import type React from 'react';

${baseProps}

/**
 * ${componentName} 원자(Atom) 컴포넌트입니다.
 * 가장 기본적인 UI 요소로, 다른 컴포넌트의 구성 요소로 사용됩니다.
 */
${baseComponent}`,

    Molecules: `import type React from 'react';

${baseProps}

/**
 * ${componentName} 분자(Molecule) 컴포넌트입니다.
 * 여러 원자 컴포넌트를 조합하여 특정 기능을 제공합니다.
 */
${baseComponent}`,

    Organisms: `import type React from 'react';

${baseProps}

/**
 * ${componentName} 유기체(Organism) 컴포넌트입니다.
 * 여러 분자 컴포넌트를 조합하여 복잡한 UI 섹션을 구성합니다.
 */
${baseComponent}`,

    Templates: `import type React from 'react';

export interface ${componentName}Props {
  readonly children: React.ReactNode;
  readonly className?: string;
}

/**
 * ${componentName} 템플릿 컴포넌트입니다.
 * 페이지의 레이아웃 구조를 정의합니다.
 */
export const ${componentName}: React.FC<${componentName}Props> = ({ children, className = '' }) => {
  return (
    <div className={\`bg-gray-50 rounded-xl shadow-sm p-6 max-w-4xl mx-auto min-h-96 \${className}\`}>
      {children}
    </div>
  );
};`,

    Pages: `import type React from 'react';

export interface ${componentName}Props {
  readonly className?: string;
}

/**
 * ${componentName} 페이지 컴포넌트입니다.
 * 특정 페이지의 전체 레이아웃과 비즈니스 로직을 담당합니다.
 */
export const ${componentName}: React.FC<${componentName}Props> = ({ className = '' }) => {
  return (
    <div className={\`min-h-screen bg-gray-100 py-10 \${className}\`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">${componentName}</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          ${componentName} 페이지 내용
        </div>
      </div>
    </div>
  );
};`,
  };

  return templates[atomicType] || templates.Atoms;
};

const getStoriesTemplate = (componentName, atomicType) => {
  const baseStories = `import type { Meta, StoryObj } from '@storybook/react-vite';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${atomicType}/${componentName}',
  component: ${componentName},
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
};`;

  // Atomic Type별 특화된 스토리
  const templates = {
    Atoms:
      baseStories +
      `

export const WithCustomClass: Story = {
  args: {
    className: 'bg-blue-100 border-2 border-blue-300',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <${componentName} className="bg-blue-100" />
      <${componentName} className="bg-green-100" />
      <${componentName} className="bg-red-100" />
    </div>
  ),
};`,

    Molecules:
      baseStories +
      `

export const WithCustomClass: Story = {
  args: {
    className: 'bg-blue-100 border-2 border-blue-300',
  },
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    return (
      <${componentName} 
        className="cursor-pointer hover:bg-gray-50"
      >
        클릭 횟수: {count}
      </${componentName}>
    );
  },
};`,

    Organisms:
      baseStories +
      `

export const WithCustomClass: Story = {
  args: {
    className: 'bg-blue-100 border-2 border-blue-300',
  },
};

export const ComplexLayout: Story = {
  render: () => (
    <div className="space-y-6">
      <${componentName} className="bg-blue-50" />
      <${componentName} className="bg-green-50" />
      <${componentName} className="bg-red-50" />
    </div>
  ),
};`,

    Templates: `import type { Meta, StoryObj } from '@storybook/react-vite';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${atomicType}/${componentName}',
  component: ${componentName},
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
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">헤더</h2>
        <p>메인 콘텐츠 영역입니다.</p>
        <div className="bg-gray-100 p-4 rounded">
          샘플 콘텐츠
        </div>
      </div>
    ),
  },
};

export const WithCustomContent: Story = {
  args: {
    className: 'bg-blue-50',
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">커스텀 콘텐츠</h2>
        <p className="text-blue-700">이것은 커스텀 콘텐츠입니다.</p>
      </div>
    ),
  },
};`,

    Pages: `import type { Meta, StoryObj } from '@storybook/react-vite';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${atomicType}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: '추가 클래스' },
  },
  parameters: {
    interactions: {
      disable: true,
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-gray-200',
  },
};

export const DarkTheme: Story = {
  args: {
    className: 'bg-gray-900 text-white',
  },
};`,
  };

  return templates[atomicType] || templates.Atoms;
};

const getTestTemplate = (componentName, atomicType) => {
  // 테스트 파일은 생성하지 않음 (프로젝트에 테스트 환경이 설정되지 않음)
  return `// ${componentName} 컴포넌트 테스트
// 필요시 별도로 테스트 환경을 설정한 후 테스트 파일을 작성하세요

/*
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName}')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<${componentName} className={customClass} />);
    const element = screen.getByText('${componentName}');
    expect(element.parentElement).toHaveClass(customClass);
  });
});
*/`;
};

const getScssTemplate = componentName => `// ${componentName} 컴포넌트 스타일
// Tailwind CSS를 사용하므로 이 파일은 추가 커스텀 스타일이 필요할 때만 사용하세요

.${componentName.toLowerCase()} {
  // 기본 스타일
  transition: all 0.2s ease-in-out;
  
  // 호버 효과
  &:hover {
    transform: translateY(-1px);
  }
  
  // 포커스 상태
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  // 비활성화 상태
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// 반응형 스타일
@media (max-width: 768px) {
  .${componentName.toLowerCase()} {
    // 모바일 스타일
  }
}`;

const getScssTypesTemplate =
  componentName => `export declare const ${componentName.toLowerCase()}: string;
`;

const getIndexTemplate = componentName => `export * from './${componentName}';
`;

const atomicTypes = ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'];

const main = () => {
  const [atomicType, componentName] = process.argv.slice(2);

  if (!atomicType || !componentName) {
    console.error(
      'Usage: node scripts/generate-component.mjs <AtomicType> <ComponentName>'
    );
    console.error(
      'Example: node scripts/generate-component.mjs Atoms MyButton'
    );
    console.error('Available atomic types:', atomicTypes.join(', '));
    process.exit(1);
  }

  if (!atomicTypes.includes(atomicType)) {
    console.error(`Invalid atomic type: ${atomicType}`);
    console.error(`Available types: ${atomicTypes.join(', ')}`);
    process.exit(1);
  }

  const componentDir = path.join(
    'src',
    'components',
    atomicType,
    componentName
  );

  if (fs.existsSync(componentDir)) {
    console.error(
      `Component ${componentName} already exists at ${componentDir}`
    );
    process.exit(1);
  }

  // 디렉토리 생성
  fs.mkdirSync(componentDir, { recursive: true });

  // 파일 생성
  const files = {
    [`${componentName}.tsx`]: getComponentTemplate(componentName, atomicType),
    [`${componentName}.stories.tsx`]: getStoriesTemplate(
      componentName,
      atomicType
    ),
    [`${componentName}.module.scss`]: getScssTemplate(componentName),
    [`${componentName}.module.scss.d.ts`]: getScssTypesTemplate(componentName),
    ['index.ts']: getIndexTemplate(componentName),
  };

  for (const [fileName, content] of Object.entries(files)) {
    const filePath = path.join(componentDir, fileName);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created: ${filePath}`);
  }

  // index.ts 업데이트 (상위 폴더의 index.ts에 export 추가)
  const parentIndexPath = path.join(
    'src',
    'components',
    atomicType,
    'index.ts'
  );
  if (fs.existsSync(parentIndexPath)) {
    const currentContent = fs.readFileSync(parentIndexPath, 'utf8');
    const newExport = `export * from './${componentName}';\n`;

    if (!currentContent.includes(newExport.trim())) {
      fs.writeFileSync(parentIndexPath, currentContent + newExport);
      console.log(`✅ Updated: ${parentIndexPath}`);
    }
  }

  console.log(
    `\n🎉 Successfully created ${atomicType}/${componentName} component!`
  );
  console.log(`📁 Location: ${componentDir}`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Review the generated files`);
  console.log(`   2. Customize the component logic`);
  console.log(`   3. Update styles in ${componentName}.module.scss`);
  console.log(`   4. Add more stories in ${componentName}.stories.tsx`);
  console.log(`   5. Run tests: npm test`);
  console.log(`   6. Start Storybook: npm run storybook`);
};

main();
