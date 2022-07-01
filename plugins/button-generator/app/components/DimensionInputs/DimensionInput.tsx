import React from 'react';
import { RadiusIcon } from '../Icons/RadiusIcon';
import { StrokeIcon } from '../Icons/StrokeIcon';
import styles from './DimensionInput.module.scss';

interface DimensionInputProps {
  type: 'width' | 'height' | 'radius' | 'stroke';
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  defaultValue: string | number;
}

export const DimensionInput = ({ type, onChange, defaultValue }: DimensionInputProps) => {
  let label: string | JSX.Element;
  switch (type) {
    case 'width':
      label = 'W';
      break;
    case 'height':
      label = 'H';
      break;
    case 'radius':
      label = <RadiusIcon />;
      break;
    case 'stroke':
      label = <StrokeIcon />;
      break;
    default:
      label = 'W';
      break;
  }
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <input type="number" onInput={(e) => onChange(e)} className={styles.field} defaultValue={defaultValue} />
    </div>
  );
};
