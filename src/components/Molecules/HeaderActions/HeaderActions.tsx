import { IconButton } from '../../Atoms/IconButton/IconButton';
import { selectVariant } from '../../../utils/variants';
import Stack from '../../common/Stack';

export type HeaderActionsVariant = 'default' | 'plus' | 'sub' | 'plus-sub';

const MENU_VARIANT_MAP: Record<HeaderActionsVariant, 'navbar' | 'ham'> = {
  default: 'navbar',
  plus: 'ham',
  sub: 'ham',
  'plus-sub': 'ham',
};

export type HeaderActionsProps = {
  onOpenMegaMenu: () => void;
  onOpenSearch: () => void;
  menuAriaLabel?: string;
  searchAriaLabel?: string;
  menuExpanded?: boolean;
  searchExpanded?: boolean;
  variant?: HeaderActionsVariant;
  menuButtonClassName?: string;
  searchButtonClassName?: string;
  containerClassName?: string;
};

export function HeaderActions({
  onOpenMegaMenu,
  onOpenSearch,
  menuAriaLabel = '메뉴',
  searchAriaLabel = '검색',
  menuExpanded = false,
  searchExpanded = false,
  variant = 'default',
  menuButtonClassName,
  searchButtonClassName,
  containerClassName,
}: HeaderActionsProps) {
  const menuVariant = selectVariant(MENU_VARIANT_MAP, variant, 'default');

  const buttons = (
    <>
      <IconButton
        variant={menuVariant}
        ariaLabel={menuAriaLabel}
        expanded={menuExpanded}
        ariaControls="menu_popup"
        className={menuButtonClassName}
        onClick={onOpenMegaMenu}
        aria-haspopup="dialog"
      />
      <IconButton
        variant="search"
        ariaLabel={searchAriaLabel}
        expanded={searchExpanded}
        ariaControls="layer_search"
        className={searchButtonClassName}
        onClick={onOpenSearch}
        aria-haspopup="dialog"
      />
    </>
  );

  if (!containerClassName) {
    return buttons;
  }

  return (
    <Stack
      direction="row"
      align="center"
      gap="0.75rem"
      inline
      className={containerClassName}
      aria-label="header actions"
    >
      {buttons}
    </Stack>
  );
}

export default HeaderActions;
