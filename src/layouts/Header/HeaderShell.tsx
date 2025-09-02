// src/layouts/Header/HeaderShell.tsx
import { type PropsWithChildren } from 'react';

export default function HeaderShell({ children }: PropsWithChildren) {
  return (
    <header id="header" className="header nav_re emblem60 sticky_top">
      {children}
    </header>
  );
}
