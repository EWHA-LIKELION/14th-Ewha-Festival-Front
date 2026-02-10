/**
 * Radio 컴포넌트 (상태: Enabled / Selected / Error)
 */

import React from 'react';

const RADIO_ICON = {
  enabled: (
    <svg className="size-5" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9.5" fill="transparent" stroke="#E5E7EB" strokeWidth="1" />
    </svg>
  ),
  selected: (
    <svg className="size-5" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9.5" stroke="#00BC7D" strokeWidth="1" />
      <circle cx="10" cy="10" r="6" fill="#00BC7D" />
    </svg>
  ),
  error: (
    <svg className="size-5" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9.5" fill="white" stroke="#FF5B5E" strokeWidth="1" />
    </svg>
  ),
};

//

function Radio({ label = '', selected = false, error = false, showLabel = true, onChange }) {
  const state = selected ? 'selected' : error ? 'error' : 'enabled';

  const handleRadioClick = () => {
    if (onChange) {
      onChange();
    }
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
      <span className="text-[0.875rem] leading-5 font-normal tracking-[0px] text-[#101828]">
        {label}
      </span>
    </button>
  );
}

export default Radio;
