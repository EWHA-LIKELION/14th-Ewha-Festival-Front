import React, { useState } from 'react';
import Input from '@/components/Input/Input.jsx';
import TextAreaSend from '@/components/Input/TextAreaSend.jsx';
import TextArea from '@/components/Input/TextArea';

const ComponentPreview = () => {
  const [square, setSquare] = useState('');
  const [round, setRound] = useState('');
  const [white, setWhite] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [error, setError] = useState(false);
  const [ta1, setTa1] = useState('');
  const [ta2, setTa2] = useState('');
  const [ta3, setTa3] = useState('');
  const [taValue, setTaValue] = useState('');
  const [taError, setTaError] = useState(false);

  const handleSubmit = (label, value, setErrorFn) => {
    if (value.trim().length === 0) {
      setErrorFn?.(true);
      return;
    }
    setErrorFn?.(false);
    alert(`${label} 제출됨: ${value}`);
  };

  const handleChangeTa = (v) => {
    setTaValue(v);
    if (v.trim().length === 0) {
      setTaError(true);
    } else {
      setTaError(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* 기본 square */}
      <div className="flex flex-col gap-2">
        <Input
          value={square}
          onChange={setSquare}
          onSubmit={() => handleSubmit('square', square)}
          placeholder="텍스트 입력 후 Enter"
          helperText="square"
          maxLength={1000}
        />
      </div>

      {/* round */}
      <div className="flex flex-col gap-2">
        <Input
          value={round}
          onChange={setRound}
          onSubmit={() => handleSubmit('round', round)}
          variant="round"
          placeholder="round input"
          helperText="round"
          maxLength={1000}
        />
      </div>

      {/* square_white */}
      <div className="flex flex-col gap-2">
        <Input
          value={white}
          onChange={setWhite}
          onSubmit={() => handleSubmit('square_white', white)}
          variant="square_white"
          placeholder="white background"
          helperText="square-white"
          maxLength={1000}
        />
      </div>

      {/* error 케이스 */}
      <div className="flex flex-col gap-2">
        <Input
          value={errorValue}
          onChange={(v) => {
            setErrorValue(v);
            if (v.length > 0) setError(false);
          }}
          onSubmit={() => handleSubmit('error input', errorValue, setError)}
          error={error}
          placeholder="빈 값으로 Enter 쳐보세요"
          helperText={error ? '필수 입력 항목입니다' : '에러 테스트'}
          maxLength={3}
        />
      </div>

      {/*send*/}
      <div className="flex flex-col gap-2">
        <TextAreaSend placeholder="send" />
      </div>

      {/*textarea1*/}
      <div className="flex flex-col gap-2">
        <TextArea
          label="제목"
          required
          size="large"
          value={ta1}
          onChange={setTa1}
          helperText="large, required"
          placeholder="Placeholder Text"
          maxLength={1000}
        />
      </div>

      {/*textarea2*/}
      <div className="flex flex-col gap-2">
        <TextArea
          label="제목"
          labelPosition="left"
          size="medium"
          value={ta2}
          onChange={setTa2}
          helperText="medium"
          placeholder="Placeholder Text"
          maxLength={1000}
        />
      </div>

      {/*textarea3*/}
      <div className="flex flex-col gap-2">
        <TextArea
          label="제목"
          labelPosition="left"
          size="small"
          value={ta3}
          onChange={setTa3}
          helperText="small"
          placeholder="Placeholder Text"
          maxLength={1000}
        />
      </div>

      {/*error 케이스*/}
      <div className="flex flex-col gap-2">
        <TextArea
          label="제목"
          labelPosition="left"
          size="small"
          value={taValue}
          onChange={handleChangeTa}
          error={taError}
          onSubmit={() => handleSubmit('error input', errorValue, setError)}
          placeholder="빈 값으로 Enter 쳐보세요"
          helperText={taError ? '필수 입력 항목입니다' : '에러 테스트'}
          maxLength={3}
        />
      </div>
    </div>
  );
};

export default ComponentPreview;
