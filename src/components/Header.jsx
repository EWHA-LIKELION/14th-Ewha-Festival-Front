/**
 * Header 컴포넌트
 *
 * left, center, right 요소를 조합해서 다양한 헤더 구성 가능
 *
 * @param {Object} props
 * @param {string} props.left - 좌측 영역: 'back'(뒤로가기), 'logo'(홈 로고), 'none'(기본)
 * @param {string} props.center - 중앙 영역: 'title'(페이지 제목), 'search'(검색바), 'none'(기본)
 * @param {string} props.centerTitle - center가 'title'일 때 표시할 제목
 * @param {string} props.right - 우측 영역: 'search'(검색 이동), 'edit'(수정), 'save'(저장), 'none'(기본)
 * @param {string} props.background - 배경 스타일: 'white'(기본), 'transparent', 'gradient'
 * @param {string} props.searchValue - 검색바 초기값 (검색 페이지 → 결과 페이지 전환 시 사용)
 * @param {Function} props.onEdit - 수정 버튼 클릭 핸들러
 * @param {Function} props.onSave - 저장 버튼 클릭 핸들러
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';

const Header = ({
  left = 'none', // back, logo
  center = 'none', // title, search
  centerTitle = '', // center가 'title'일 때 표시할 제목
  right = 'none', // search, edit, save
  background = 'white', // white, transparent, gradient
  searchValue, //검색바 입력 값 (검색페이지 -> 검색결과페이지로 넘어갈 때 필요)
  onEdit,
  onSave,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const goSearch = () => {
    navigate('/search');
  };

  // 배경 스타일
  const backgroundStyles = {
    white: 'bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]',
    transparent: 'bg-transparent',
    gradient: 'bg-linear-to-b from-[#292929]/50',
  };

  const iconColor = background === 'gradient' ? '#FFF' : '#4A5565';

  return (
    <header
      className={`fixed top-0 left-1/2 z-10 flex h-18 w-full -translate-x-1/2 items-center px-2 md:w-[392px] ${backgroundStyles[background]}`}
      style={background === 'gradient' ? { paddingTop: 'env(safe-area-inset-top)' } : undefined}
    >
      {/* Left 영역 */}
      <div className="flex items-center justify-start">
        {left === 'back' && (
          <button onClick={handleBack} className="p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.5 3L7.5 12L16.5 21"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {left === 'logo' && (
          <img
            src="/icons/icon-logo.svg" // 추후 업데이트 예정
            alt="logo"
            className="h-10" // 추후 수정 예정
            onClick={() => navigate('/')}
          />
        )}
      </div>

      {/* Center 영역 */}
      <div className="flex flex-1 items-center justify-center">
        {center === 'title' && (
          <h1 className="w-full text-left text-lg font-semibold text-gray-900">{centerTitle}</h1>
        )}
        {center === 'search' && (
          <SearchBar isMap={background === 'transparent'} searchValue={searchValue} />
        )}
      </div>

      {/* Right 영역 */}
      <div className="flex items-center justify-end">
        {right === 'search' && (
          <button onClick={goSearch} className="p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10.8869 19.4165C15.7961 19.4165 19.7758 15.4368 19.7758 10.5276C19.7758 5.61836 15.7961 1.63867 10.8869 1.63867C5.97774 1.63867 1.99805 5.61836 1.99805 10.5276C1.99805 15.4368 5.97774 19.4165 10.8869 19.4165Z"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.9974 21.638L17.1641 16.8047"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {right === 'edit' && (
          <button onClick={onEdit} className="p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.0572 2.94275C20.7544 2.64125 20.3949 2.40274 19.9994 2.24098C19.6039 2.07922 19.1803 1.99743 18.753 2.00032C18.3257 2.00321 17.9032 2.09073 17.51 2.25783C17.1167 2.42493 16.7605 2.66829 16.4618 2.97386L3.57329 15.8624L2 21.9999L8.13759 20.4258L21.0261 7.53727C21.3317 7.23874 21.5752 6.88257 21.7423 6.48937C21.9095 6.09618 21.997 5.67374 21.9999 5.2465C22.0028 4.81926 21.921 4.39568 21.7592 4.00025C21.5974 3.60483 21.3588 3.2454 21.0572 2.94275V2.94275Z"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.0938 3.34277L20.6572 7.90619"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.57422 15.8616L8.14208 20.4214"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {right === 'save' && (
          <button
            onClick={onSave}
            className="mr-3 h-8 rounded-full bg-emerald-500 px-4 text-sm font-medium text-white"
          >
            저장
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
