import React, { useState, useEffect } from 'react';
import styles from './ToggleInput.module.scss';

interface ToggleSide {
  label: string;
  value: string;
}

interface ToggleInputProps {
  left: ToggleSide;
  right: ToggleSide;
  label: string;
  onChange: (value: string) => void;
}

export const ToggleInput = ({ left, right, label, onChange }: ToggleInputProps) => {
  const [currentValue, setCurrentValue] = useState(left.value);
  const [leftClass, setLeftClass] = useState(`${styles.base} ${styles.selected}`);
  const [rightClass, setRightClass] = useState(styles.base);

  useEffect(() => {
    onChange(currentValue);
    if (currentValue === left.value) {
      setLeftClass(`${styles.base} ${styles.selected}`);
      setRightClass(styles.base);
    } else if (currentValue === right.value) {
      setRightClass(`${styles.base} ${styles.selected}`);
      setLeftClass(styles.base);
    }
  }, [currentValue]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.toggleWrapper}>
        <div className={leftClass} onClick={() => setCurrentValue(left.value)}>
          {left.label}
        </div>
        <div className={rightClass} onClick={() => setCurrentValue(right.value)}>
          {right.label}
        </div>
      </div>
    </div>
  );
};
