/**
 * 공통 컴포넌트 프리뷰 페이지
 */

import React from 'react';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';

const ComponentPreview = () => {
  return (
    <div className="flex flex-col items-center bg-amber-200">
      <br />
      <SearchBar />
      <br />
      <SearchBar isMap />
      <br />
      <h1>[IconOnlyButton]</h1>
      <br />
      <Button leftIcon="/icons/icon-search.svg"></Button>
      <br />
      <Button variant="bg-gray" size="md" circle leftIcon="/icons/icon-search.svg"></Button>
      <br />
      <Button variant="text-gray" size="sm" circle leftIcon="/icons/icon-search.svg"></Button>
      <br />
      <br />
      <h1>[IconOnlyButton Disabled]</h1>
      <br />
      <Button disabled leftIcon="/icons/icon-search.svg"></Button>
      <br />
      <Button
        disabled
        variant="bg-gray"
        size="md"
        circle
        leftIcon="/icons/icon-search.svg"
      ></Button>
      <br />
      <Button
        disabled
        variant="text-black"
        size="sm"
        circle
        leftIcon="/icons/icon-search.svg"
      ></Button>
      <br />
      <br />
      <h1>[Button]</h1>
      <br />
      <Button leftIcon="/icons/icon-search.svg" rightIcon="/icons/icon-search.svg">
        Button
      </Button>
      <br />
      <Button
        variant="bg-white"
        shadow
        circle
        leftIcon="/icons/icon-search.svg"
        rightIcon="/icons/icon-search.svg"
      >
        Button
      </Button>
      <br />
      <Button variant="underline-green">Button</Button>
      <br />
      <Button
        variant="bg-red"
        size="md"
        leftIcon="/icons/icon-search.svg"
        rightIcon="/icons/icon-search.svg"
      >
        Button
      </Button>
      <br />
      <Button
        variant="bg-gray"
        size="md"
        circle
        leftIcon="/icons/icon-search.svg"
        rightIcon="/icons/icon-search.svg"
      >
        Button
      </Button>
      <br />
      <Button variant="underline-gray" size="md">
        Button
      </Button>
      <br />
      <Button
        variant="bg-gray"
        size="sm"
        leftIcon="/icons/icon-search.svg"
        rightIcon="/icons/icon-search.svg"
      >
        Button
      </Button>
      <br />
      <Button
        variant="bg-pink"
        size="sm"
        circle
        leftIcon="/icons/icon-search.svg"
        rightIcon="/icons/icon-search.svg"
      >
        Button
      </Button>
      <br />
      <Button variant="underline-white" size="sm">
        Button
      </Button>
      <br />
      <br />
      <h1>[Button Disabled]</h1>
      <br />
      <Button disabled leftIcon="/icons/icon-search.svg" rightIcon="/icons/icon-search.svg">
        Button
      </Button>
      <br />
      <Button
        variant="text-black"
        disabled
        size="md"
        leftIcon="/icons/icon-search.svg"
        rightIcon="/icons/icon-search.svg"
      >
        Button
      </Button>
      <br />
      <Button variant="underline-green" disabled size="sm">
        Button
      </Button>
      <br />
    </div>
  );
};

export default ComponentPreview;
