import React, { useState, useEffect } from 'react';
import { usePostMessage } from 'figma-react-hooks';
import styles from './ui.module.scss';
import { Button } from './components/Button';
import { InputField } from './components/InputField';
import { DimensionInputGroup } from './components/DimensionInputs';
import { ToggleInput } from './components/ToggleInput';
import type { Dimensions } from './components/DimensionInputs/DimensionInputGroup';

export interface PostMessageData {
  width: number;
  height: number;
  radius: number;
  stroke: number;
  type: string;
  text: string;
  backgroundColor: string;
  textColor: string;
}

const UI = ({}) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(25);
  const [radius, setRadius] = useState(0);
  const [stroke, setStroke] = useState(1);
  const [type, setType] = useState('primary');
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#363636');
  const [backgroundColor, setBackgroundColor] = useState('#1a8fdd');
  const [enableStroke, setEnableStroke] = useState(false);

  const onCreate = () => {
    const data: PostMessageData = {
      width,
      height,
      radius,
      stroke,
      type,
      text,
      textColor,
      backgroundColor,
    };
    usePostMessage({ type: 'create-button', data });
  };

  const onCancel = () => {
    usePostMessage({ type: 'cancel' });
  };

  const updateDimensions = (dimensions: Dimensions) => {
    setWidth(dimensions.width);
    setHeight(dimensions.height);
    setRadius(dimensions.radius);
    setStroke(dimensions.stroke);
  };

  useEffect(() => {
    if (type === 'secondary') {
      setEnableStroke(true);
    } else {
      setEnableStroke(false);
    }
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <DimensionInputGroup onChange={updateDimensions} enableStroke={enableStroke} />
        <ToggleInput
          label="Type"
          left={{ label: 'Primary', value: 'primary' }}
          right={{ label: 'Secondary', value: 'secondary' }}
          onChange={(value) => setType(value)}
        />
        <InputField label="Text" onChange={(value) => setText(value)} />
        <InputField
          label="Button color"
          onChange={(value) => setBackgroundColor(value)}
          isColor
          defaultValue="#1a8fdd"
        />
        <InputField label="Text color" onChange={(value) => setTextColor(value)} isColor defaultValue="#363636" />
        <div className={styles.divider}>&nbsp;</div>
        <div className={styles.buttonContainer}>
          <Button onClick={onCreate}>Create button</Button>
          <Button onClick={onCancel} secondary>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UI;
