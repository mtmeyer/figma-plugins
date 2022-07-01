import React, { useState, useEffect } from 'react';

import styles from './ui.module.scss';
import { colours } from './assets/colours';
import { defaultTags } from './assets/defaultTags';

import Button from './components/Button';
import ColourButton from './components/ColourButton';
import DividerLine from './components/DividerLine';
import AlertBar from './components/AlertBar';
import Dropdown from './components/Dropdown';

import { usePostMessage, useOnMessage } from 'figma-react-hooks';
import InputField from './components/InputField';

type SelectOptionType = {
  value: string;
  label: string;
};

const UI = ({}) => {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [selectedColour, setSelectedColour] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [colourList, setColourList] = useState<Array<JSX.Element>>(null);
  const [defaultTagDropdownIndex, setDefaultTagDropdownIndex] = useState<number | undefined>(undefined);
  const [defaultSizeDropdownIndex, setDefaultSizeDropdownIndex] = useState<number | undefined>(undefined);
  const [validationError, setValidationError] = useState<boolean>(false);

  const generateColourButtonList = (selected: string) => {
    let colourButtons = Object.values(colours).map((colour) => {
      let isSelected = false;
      if (selected == colour) {
        isSelected = true;
      }
      return (
        <ColourButton
          colour={colour}
          onClick={() => onColourChange(colour)}
          key={colour}
          selected={isSelected}
          id={colour}
        />
      );
    });
    setColourList(colourButtons);
  };

  useEffect(() => {
    generateColourButtonList(colours.red);
  }, []);

  useOnMessage((data) => {
    if (data) {
      const { tag, colour, size } = data;
      setSelectedTag(tag);
      setSelectedColour(colour);
      setSelectedSize(size);
      generateColourButtonList(colour);
    } else {
      setSelectedTag('');
      setSelectedSize('small');
    }
  });

  let tagOptions: Array<SelectOptionType> = defaultTags.map((tag) => {
    return { value: tag.value, label: tag.tag };
  });

  let sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  useEffect(() => {
    if (typeof selectedTag !== 'undefined' && tagOptions && sizeOptions && typeof selectedSize !== 'undefined') {
      let tagDropdownIndex = -1;
      let sizeDropdownIndex = -1;
      for (const [i, entry] of tagOptions.entries()) {
        if (entry.label === selectedTag) {
          tagDropdownIndex = i;
        }
      }
      for (const [i, entry] of sizeOptions.entries()) {
        if (entry.value === selectedSize) {
          sizeDropdownIndex = i;
        }
      }
      setDefaultTagDropdownIndex(tagDropdownIndex);
      setDefaultSizeDropdownIndex(sizeDropdownIndex);
    }
  }, [tagOptions, selectedTag, selectedSize, sizeOptions]);

  const onCreate = () => {
    if (!selectedTag || !selectedColour) {
      setValidationError(true);
    } else {
      usePostMessage({ label: selectedTag, colour: selectedColour, size: selectedSize });
    }
  };

  const onTagDropdownChange = (value: SelectOptionType) => {
    setSelectedTag(value.label);
    setValidationError(false);
  };

  const onSizeDropdownChange = (value: SelectOptionType) => {
    setSelectedSize(value.value);
    setValidationError(false);
  };

  const onColourChange = (value: string) => {
    generateColourButtonList(value);
    setSelectedColour(value);
    setValidationError(false);
  };

  const handleColorChange = (colour: string) => {
    generateColourButtonList(colour);
    setSelectedColour(colour);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Frame Tags</h2>
      {validationError ? <AlertBar content="Please choose a tag and color" /> : <></>}
      <p className={styles.label}>Tag</p>
      <div className={styles.dropdown}>
        {defaultTagDropdownIndex >= -1 ? (
          <Dropdown
            defaultValue={tagOptions[defaultTagDropdownIndex]}
            options={tagOptions}
            onChange={(value: SelectOptionType) => onTagDropdownChange(value)}
          />
        ) : (
          <></>
        )}
      </div>
      <p className={styles.label}>Size</p>
      <div className={styles.dropdown}>
        {defaultSizeDropdownIndex >= -1 ? (
          <Dropdown
            defaultValue={sizeOptions[defaultSizeDropdownIndex]}
            options={sizeOptions}
            onChange={(value: SelectOptionType) => onSizeDropdownChange(value)}
          />
        ) : (
          <></>
        )}
      </div>
      <p className={styles.label}>Tag color</p>
      <div className={styles.colourContainer}>{colourList}</div>
      {/* <p className={styles.customColourLabel}>Custom color</p> */}
      <InputField isColor label="" onChange={handleColorChange} value={selectedColour} />

      <DividerLine />
      <Button onClick={onCreate}>Create</Button>
    </div>
  );
};

export default UI;
