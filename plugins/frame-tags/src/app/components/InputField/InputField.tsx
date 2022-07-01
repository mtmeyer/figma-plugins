import React from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps {
  label: string;
  onChange: (value: string) => void;
  isColor?: boolean;
  value?: string;
}

export default function InputField({ label, onChange, value, isColor = false }: InputFieldProps) {
  // const [value, setValue] = useState(defaultValue);
  const updateValue = (event) => {
    const tmpValue = (event.target as HTMLInputElement).value;
    onChange(tmpValue);
  };
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <div className={styles.colorWrapper}>
        {isColor ? (
          <div className={styles.fakePicker} style={{ backgroundColor: value }}>
            <input type="color" className={styles.color} onChange={updateValue} value={value} />
          </div>
        ) : null}
        <input type="text" onInput={updateValue} className={styles.field} value={value} />
      </div>
    </label>
  );
}
