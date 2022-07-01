import React from 'react';
import Select, { Props } from 'react-select';

const Dropdown = ({ ...restProps }: Props) => {
  const reactSelectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      border: '2px solid var(--figma-color-bg-disabled)',
      color: 'var(--figma-color-text)',
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? 'var(--figma-color-bg)' : 'var(--figma-color-icon-oninverse)',
        color: 'var(--figma-color-text)',
        cursor: 'pointer',
      };
    },
    singleValue: (styles) => {
      return {
        ...styles,
        color: 'var(--figma-color-text)',
      };
    },
    placeholder: (styles) => {
      return {
        ...styles,
        color: 'var(--figma-color-text-tertiary)',
      };
    },
    menuList: (styles) => {
      return {
        ...styles,
        padding: '0',
        '::-webkit-scrollbar-track': {
          background: 'var(--figma-color-icon-oninverse)',
        },
        '::-webkit-scrollbar': {
          width: '4px',
          height: '0px',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'var(--figma-color-bg-brand)',
        },
      };
    },
  };

  return <Select styles={reactSelectStyles} {...restProps} />;
};

export default Dropdown;
