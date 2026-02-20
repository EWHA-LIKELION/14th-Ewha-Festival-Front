/**
 * Radio 컴포넌트 (상태: Enabled / Selected / Error)
 */

import React from 'react';

const RADIO_ICON = {
  enabled: (
    <svg className="size-5 fill-none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9.5" className="fill-transparent stroke-gray-200 stroke-1" />
    </svg>
  ),
  selected: (
    <svg className="size-5 fill-none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9.5" className="stroke-emerald-500 stroke-1" />
      <circle cx="10" cy="10" r="6" className="fill-emerald-500" />
    </svg>
  ),
  error: (
    <svg className="size-5 fill-none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9.5" className="fill-white stroke-red-400 stroke-1" />
    </svg>
  ),
};

function Radio({ label = '', selected = false, error = false, showLabel = true, onChange }) {
  const state = selected ? 'selected' : error ? 'error' : 'enabled';

  const handleRadioClick = () => {
    onChange?.();
  };

  if (!showLabel) {
    return (
      <button
        type="button"
        onClick={handleRadioClick}
        className="flex size-6 shrink-0 items-center justify-center"
      >
        {RADIO_ICON[state]}
      </button>
    );
  }

  return (
    <button type="button" onClick={handleRadioClick} className="flex items-center gap-2">
      <span className="flex size-6 shrink-0 items-center justify-center">{RADIO_ICON[state]}</span>
      <span className="text-sm leading-5 font-normal tracking-normal text-gray-900">{label}</span>
    </button>
  );
}

export default Radio;
