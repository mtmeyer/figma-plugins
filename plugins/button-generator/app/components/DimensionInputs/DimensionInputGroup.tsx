import React, { useState, useEffect } from 'react';
import { DimensionInput } from './DimensionInput';
import styles from './DimensionInput.module.scss';

export interface Dimensions {
  width: number;
  height: number;
  radius: number;
  stroke: number;
}

interface DimensionInputGroupProps {
  onChange: (dimensions: Dimensions) => void;
  enableStroke: boolean;
}

export const DimensionInputGroup = ({ onChange, enableStroke }: DimensionInputGroupProps) => {
  const [width, setWidth] = useState('100');
  const [height, setHeight] = useState('25');
  const [radius, setRadius] = useState('0');
  const [stroke, setStroke] = useState('1');

  useEffect(() => {
    onChange({
      width: parseInt(width),
      height: parseInt(height),
      radius: parseInt(radius),
      stroke: parseInt(stroke),
    });
  }, [width, height, radius]);

  return (
    <div className={styles.groupWrapper}>
      <DimensionInput
        type="width"
        onChange={(event) => setWidth((event.target as HTMLInputElement).value)}
        defaultValue={100}
      />
      <DimensionInput
        type="height"
        onChange={(event) => setHeight((event.target as HTMLInputElement).value)}
        defaultValue={25}
      />
      <DimensionInput
        type="radius"
        onChange={(event) => setRadius((event.target as HTMLInputElement).value)}
        defaultValue={0}
      />
      {enableStroke ? (
        <DimensionInput
          type="stroke"
          onChange={(event) => setStroke((event.target as HTMLInputElement).value)}
          defaultValue={1}
        />
      ) : null}
    </div>
  );
};
