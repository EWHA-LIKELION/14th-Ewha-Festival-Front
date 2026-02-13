/**
 * IconButton 컴포넌트
 */

import React from 'react';

const ICONS = {
  back: '/icons/icon-back.svg',
  forward: '/icons/icon-forward.svg',
  bookmark: '/icons/icon-bookmark.svg',
  chevronleft: '/icons/icon-chevronleft.svg',
  pencil: '/icons/icon-pencil.svg',
  trash: '/icons/icon-trash.svg',
  greenarrow: '/icons/icon-greenarrow.svg',
  xmarkgrey: '/icons/icon-xmarkgrey.svg',
  xmarkblack: '/icons/icon-xmarkblack.svg',
  xmarkwhite: '/icons/icon-xmarkwhite.svg',
  github: '/icons/logo-github.svg',
  instagram: '/icons/logo-instagram.svg',
  instagramcolor: '/icons/logo-instagramcolor.svg',
  kakaotalk: '/icons/logo-kakaotalk.svg',
  kakaotalkcolor: '/icons/logo-kakaotalkcolor.svg',
  likelion: '/icons/logo-likelion.svg',
};

const SearchIcon = ({ color = '#4A5565' }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.0734 26.1803C23.1644 26.1803 26.4808 22.8639 26.4808 18.7729C26.4808 14.6819 23.1644 11.3655 19.0734 11.3655C14.9824 11.3655 11.666 14.6819 11.666 18.7729C11.666 22.8639 14.9824 26.1803 19.0734 26.1803Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: 'stroke 0.2s ease' }}
    />
    <path
      d="M28.3325 28.0317L24.3047 24.0039"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: 'stroke 0.2s ease' }}
    />
  </svg>
);

function IconButton({ name, size = 'min-w-fit', alt = '', className = '', onClick, color }) {
  if (name === 'search' && color) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <SearchIcon color={color} />
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <img src={ICONS[name]} alt={alt || name} width={size} height={size} />
    </button>
  );
}

export default IconButton;
