// components/Organisms/HeaderBar/LangLinks.tsx
import * as React from 'react';

function LangLinks() {
  return (
    <ul className="language_site sm_hidden md_hidden">
      <li>
        <a href="https://japanese.joins.com/">日文</a>
      </li>
      <li>
        <a href="https://chinese.joins.com/">中文</a>
      </li>
      <li>
        <a href="https://koreajoongangdaily.joins.com/">ENG</a>
      </li>
    </ul>
  );
}

export default React.memo(LangLinks);
