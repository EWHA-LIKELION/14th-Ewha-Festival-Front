/**
 * IconButton 컴포넌트
 */

import React from 'react';

const ICONS = {
  bookmark: '/icons/icon-bookmark.svg',
  chevronleft: '/icons/icon-chevronleft.svg',
  pencil: '/icons/icon-pencil.svg',
  search: '/icons/icon-search.svg',
  trash: '/icons/icon-trash.svg',
  greenarrow: '/icons/icon-greenarrow.svg',
  xmarkgrey: '/icons/icon-xmarkgrey.svg',
  xmarkblack: '/icons/icon-xmarkblack.svg',
  xmarkwhite: '/icons/icon-xmarkwhite.svg',
  github: '/icons/logo-github.svg',
  instagram: '/icons/logo-instagram.svg',
  instagramcolor: '/icons/logo-instagramcolor.svg',
  kakaotalk: '/icons/logo-kakaotalk.svg',
  likelion: '/icons/logo-likelion.svg',
};

function IconButton({ name, size = 'min-h-fit', alt = '', className = 'p-0 ', onClick }) {
  return (
    <button type="button" onClick={onClick} className={className}>
      <img src={ICONS[name]} alt={alt || name} width={size} height={size} />
    </button>
  );
}

export default IconButton;
