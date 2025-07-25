// @eslint/js: ESLint의 핵심 규칙을 적용합니다.
import js from '@eslint/js';
// globals: 'browser', 'node' 등 사전 정의된 전역 변수 설정을 가져옵니다.
import globals from 'globals';
// typescript-eslint: TypeScript 코드의 린팅 규칙을 제공합니다.
import tseslint from 'typescript-eslint';
// eslint-plugin-react: React 코드에 특화된 린팅 규칙을 적용합니다.
import react from 'eslint-plugin-react';
// eslint-plugin-react-hooks: React Hooks의 규칙을 강제하고 실수를 방지합니다.
import reactHooks from 'eslint-plugin-react-hooks';
// eslint-plugin-react-refresh: React Fast Refresh 관련 규칙을 적용합니다.
import reactRefresh from 'eslint-plugin-react-refresh';
// eslint-plugin-jsx-a11y: JSX의 웹 접근성 규칙을 검사합니다.
import jsxA11y from 'eslint-plugin-jsx-a11y';
// eslint-plugin-import: ES6+의 import/export 구문을 린팅하고, 파일 경로 문제나 순서를 관리합니다.
import importPlugin from 'eslint-plugin-import';
// eslint-plugin-prettier: Prettier의 포매팅 규칙을 ESLint 규칙으로 통합하여 실행합니다.
import prettier from 'eslint-plugin-prettier';
// eslint-plugin-storybook: Storybook 파일에 대한 규칙을 적용합니다.
import storybook from 'eslint-plugin-storybook';

// 설정 객체 또는 배열을 받아 files 속성을 추가하여 평탄화하는 헬퍼 함수입니다.
// 이를 통해 특정 파일 패턴에 동일한 설정을 간결하게 적용할 수 있습니다.
function flatConfigWithFiles(config, files) {
  if (Array.isArray(config)) {
    return config.map(c => ({ ...c, files }));
  }
  return [{ ...config, files }];
}

export default [
  // --- 설정 파일 (e.g., vite.config.ts) ---
  // 타입 정보 오류를 피하기 위해 가장 먼저 배치합니다.
  {
    files: ['**/*.config.{js,ts}', 'vite.config.ts', '**/*.d.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node, // Node.js 전역 변수 활성화
        ...globals.es2022, // ES2022 전역 변수 활성화
      },
    },
    rules: {
      'no-console': 'off', // 설정 파일에서는 console 사용을 허용합니다.
      // 타입 정보 오류를 방지하기 위해 @typescript-eslint 규칙을 적용하지 않습니다.
    },
  },
  // --- Storybook 설정 파일 ---
  // 타입 인식(type-aware) 규칙 없이 기본적인 JS 규칙만 적용합니다.
  {
    files: ['.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      'no-console': 'off', // Storybook 설정 파일에서는 console 사용을 허용합니다.
      // 타입 정보 오류를 방지하기 위해 타입 인식 TS 규칙을 적용하지 않습니다.
    },
  },
  // --- 전역 무시 설정 ---
  {
    ignores: [
      'dist', // 빌드 결과물
      'build', // 빌드 결과물
      'node_modules', // 의존성 패키지
      'coverage', // 테스트 커버리지 리포트
      'storybook-static', // Storybook 빌드 결과물
      '*.min.js', // 압축된 JS 파일
      '*.min.css', // 압축된 CSS 파일
      '*.generated.*', // 자동으로 생성된 파일
      'vite.config.ts', // 별도 설정으로 관리
      '**/*.test.{ts,tsx}', // 테스트 파일 (별도 설정 예정)
      '**/*.spec.{ts,tsx}', // 테스트 파일 (별도 설정 예정)
      '.storybook/**/*.ts', // Storybook 설정 파일 (별도 설정으로 관리)
    ],
  },
  // --- 기본 설정: src/**/*.{ts,tsx} 파일에만 엄격한 규칙 적용 ---
  // 각 플러그인의 추천(recommended) 설정을 src 폴더 내의 TypeScript/TSX 파일에 적용합니다.
  ...flatConfigWithFiles(js.configs.recommended, ['src/**/*.{ts,tsx}']),
  ...flatConfigWithFiles(tseslint.configs.recommended, ['src/**/*.{ts,tsx}']),
  ...flatConfigWithFiles(tseslint.configs.recommendedTypeChecked, [
    'src/**/*.{ts,tsx}',
  ]),
  ...flatConfigWithFiles(react.configs.flat.recommended, ['src/**/*.{ts,tsx}']),
  ...flatConfigWithFiles(react.configs.flat['jsx-runtime'], [
    'src/**/*.{ts,tsx}',
  ]),
  // --- src/**/*.{ts,tsx}에 대한 커스텀 엄격 규칙 ---
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser, // 브라우저 전역 변수 활성화
        ...globals.es2022, // ES2022 전역 변수 활성화
      },
      parserOptions: {
        project: ['./tsconfig.app.json'], // 타입 기반 린팅을 위해 tsconfig 파일 지정
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true }, // JSX 파싱 활성화
      },
    },
    settings: {
      react: { version: 'detect' }, // 설치된 React 버전을 자동으로 감지
      'import/resolver': {
        typescript: { project: './tsconfig.app.json' }, // TypeScript 경로 별칭(@/components)을 해석
      },
    },
    rules: {
      // --- TypeScript 엄격 규칙 ---
      // 함수의 반환 타입을 명시적으로 선언하도록 강제합니다. (표현식은 허용)
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
      // 'any' 타입 사용을 금지합니다.
      '@typescript-eslint/no-explicit-any': 'error',
      // Promise를 반환하는 함수 호출 시 await 또는 .then() 처리를 강제합니다.
      '@typescript-eslint/no-floating-promises': 'error',
      // Promise를 잘못된 위치(e.g., if 문의 조건)에 사용하는 것을 금지합니다.
      '@typescript-eslint/no-misused-promises': 'error',
      // 불필요한 타입 단언(assertion)을 금지합니다.
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      // 타입만 가져올 때는 'import type'을 사용하도록 강제합니다.
      '@typescript-eslint/consistent-type-imports': 'error',
      // 수정되지 않는 private 멤버에 'readonly' 키워드를 사용하도록 권장합니다.
      '@typescript-eslint/prefer-readonly': 'error',
      // if, while 등에서 boolean이 아닌 타입을 암시적으로 사용하는 것을 금지합니다.
      '@typescript-eslint/strict-boolean-expressions': 'error',
      // 사용하지 않는 변수를 금지합니다. '_'로 시작하는 변수는 예외로 처리합니다.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // 상위 스코프에 선언된 변수와 동일한 이름의 변수를 선언하는 것(shadowing)을 금지합니다.
      '@typescript-eslint/no-shadow': 'error',

      // --- React/JSX 규칙 ---
      // boolean 속성을 항상 `prop={true}` 형태로 명시하도록 강제합니다.
      'react/jsx-boolean-value': ['error', 'always'],
      // optional props에 대해 defaultProps 또는 기본 매개변수로 기본값을 설정하도록 강제합니다.
      'react/require-default-props': [
        'error',
        { functions: 'defaultArguments' },
      ],
      // JSX에서 props spreading ({...props}) 사용을 금지합니다.
      'react/jsx-props-no-spreading': 'error',
      // 함수형 컴포넌트를 화살표 함수 스타일로 정의하도록 강제합니다.
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      // React 17+에서는 'import React from "react"'가 필요 없으므로 비활성화합니다.
      'react/react-in-jsx-scope': 'off',
      // TypeScript를 사용하므로 prop-types 검사를 비활성화합니다.
      'react/prop-types': 'off',

      // --- Import / 순서 규칙 ---
      // devDependencies에 있는 패키지를 src 폴더에서 import하는 것을 금지합니다. (예외 설정)
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{ts,tsx}',
            '**/*.spec.{ts,tsx}',
            '**/*.stories.{ts,tsx}',
            '**/vite.config.ts',
            '**/.storybook/**',
          ],
        },
      ],
      // import 구문의 순서를 강제하여 코드 일관성을 유지합니다.
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js 내장 모듈
            'external', // npm 패키지
            'internal', // 내부 경로 별칭
            'parent', // 부모 디렉토리
            'sibling', // 형제 디렉토리
            'index', // 현재 디렉토리의 index 파일
            'object', // 객체 import
            'type', // 타입 import
          ],
          'newlines-between': 'always', // 그룹 사이에 항상 한 줄 띄웁니다.
          alphabetize: { order: 'asc', caseInsensitive: true }, // 그룹 내에서 알파벳 순으로 정렬합니다.
        },
      ],

      // --- 웹 접근성(Accessibility) 규칙 ---
      // 유효하지 않은 href를 가진 <a> 태그 사용을 금지합니다.
      'jsx-a11y/anchor-is-valid': 'error',
      // <label> 태그가 항상 연관된 입력 컨트롤을 갖도록 강제합니다.
      'jsx-a11y/label-has-associated-control': 'error',

      // --- 협업 / 엄격한 규칙 ---
      'no-console': 'error', // console 객체 사용 금지
      'no-debugger': 'error', // debugger 구문 사용 금지
      'no-alert': 'error', // alert, confirm, prompt 사용 금지
      'no-param-reassign': 'error', // 함수 매개변수 재할당 금지
      'no-return-await': 'error', // 불필요한 'return await' 사용 금지
      'no-implicit-coercion': 'error', // 암시적 타입 변환 금지 (e.g., !!'foo', + '123')
      'no-underscore-dangle': 'error', // 식별자 앞뒤에 밑줄(_) 사용 금지
      'consistent-return': 'error', // 함수 내에서 일관성 있는 return 사용 강제
      'max-lines': ['error', 500], // 파일의 최대 라인 수 제한
      'max-depth': ['error', 4], // 코드 블록의 최대 중첩 깊이 제한
      'max-params': ['error', 4], // 함수의 최대 파라미터 개수 제한
      'max-statements': ['error', 20], // 함수의 최대 구문 수 제한

      // --- 스타일 규칙 ---
      // 특정 구문 사이에 빈 줄을 강제하여 가독성을 높입니다.
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      // Prettier에서 감지한 포매팅 오류를 ESLint 오류로 보고합니다.
      'prettier/prettier': 'error',
    },
  },
  // --- Storybook 스토리 파일: 필요한 경우에만 규칙 완화 ---
  ...flatConfigWithFiles(storybook.configs['flat/recommended'], [
    '**/*.stories.{ts,tsx}',
  ]),
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      // 스토리 파일에서는 함수의 반환 타입을 명시하지 않아도 되도록 허용합니다.
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Storybook의 Component Story Format(CSF)은 default export를 사용하므로 허용합니다.
      'import/no-default-export': 'off',
      // Storybook에서 args를 컴포넌트에 전달하기 위해 props spreading이 자주 사용되므로 허용합니다.
      'react/jsx-props-no-spreading': 'off',
      // 설치되지 않은 Storybook 애드온을 사용하면 오류를 발생시킵니다.
      'storybook/no-uninstalled-addons': 'error',
    },
  },
];
