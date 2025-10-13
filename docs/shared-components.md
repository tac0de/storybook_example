# Shared UI Building Blocks

이 프로젝트에서 반복 패턴을 줄이고 가독성을 높이기 위해 도입한 공통 컴포넌트를 정리했습니다. 강의나 코드 리뷰 때 바로 참고할 수 있도록 사용 예시까지 포함했습니다.

## DefinitionListSection

`src/components/common/DefinitionListSection.tsx`

```tsx
<DefinitionListSection
  className="special"
  title="스페셜"
  titleHref="https://www.joongang.co.kr/special"
  showFoldIcon
>
  <MegaMenuLinkList links={config.special.links} />
</DefinitionListSection>
```

- `<dl>/<dt>/<dd>` 패턴을 캡슐화했습니다.
- 제목 앵커, fold 아이콘, body 클래스 등을 한 번에 처리합니다.
- 메가메뉴 외에도 FAQ, 정의 리스트 등 여러 영역에 재사용할 수 있습니다.

## InlineLinkList

`src/components/common/InlineLinkList.tsx`

```tsx
<InlineLinkList
  links={searchLayerConfig.trendKeywords}
  className="tag_nav"
  itemClassName="nav_item"
  renderLink={keyword => (
    <SearchTagLink
      href={keyword.href}
      label={keyword.label}
      eventCategory={keyword.eventCategory}
      eventAction={keyword.eventAction}
      eventLabel={keyword.eventLabel}
    />
  )}
/>
```

- `<ul>/<li>` 반복을 제거하고, 원하는 렌더러만 전달하면 됩니다.
- `renderLink` 없이 사용하면 기본 `<a>` 렌더링을 제공하여 빠른 목업도 가능합니다.
- `keyExtractor`로 key 전략을 주입할 수도 있습니다.

## StickyAsideLayout

`src/components/common/StickyAsideLayout.tsx`

```tsx
<StickyAsideLayout
  main={<MegaMenuNavigation config={megaMenuConfig} />}
  aside={<DefinitionListSection title="Notes">{notes}</DefinitionListSection>}
  stickyOffset={24}
/>
```

- 메인 콘텐츠와 보조 패널(예: 설명, diff, 광고 영역)을 간단히 배치하는 레이아웃입니다.
- 기본적으로 2:1 컬럼 구조와 sticky aside를 제공하지만 `columns`, `gap`, `stickyOffset`으로 쉽게 조정할 수 있습니다.
- Storybook 데모나 문서 페이지에서 “컴포넌트 + 설명/코드”를 나란히 보여줄 때 유용합니다.

## 조합 예시

아래처럼 config → 공통 섹션 → atom 조합을 한 파일에서 보여줄 수 있습니다.

```tsx
<DefinitionListSection
  className="news"
  title={config.news.title}
>
  <InlineLinkList
    links={config.news.links}
    renderLink={link => <MegaMenuLink href={link.href} label={link.label} />}
  />
</DefinitionListSection>
```

이 패턴을 활용하면 config 변경이나 디자인 수정을 JS/TS 레벨에서 최소한으로 반영할 수 있고, Storybook에서도 동일한 컴포넌트를 그대로 시연할 수 있습니다.
