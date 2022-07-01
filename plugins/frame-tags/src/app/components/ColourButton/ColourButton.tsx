import React, { useState, useEffect } from 'react';

import styles from './ColourButton.module.scss';

type ComponentProps = {
  colour: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  selected: boolean;
  id: string;
};

const ColourButton = ({ onClick, colour, selected, id }: ComponentProps) => {
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({});
  const [buttonColour, setButtonColour] = useState<React.CSSProperties>({});

  useEffect(() => {
    setButtonColour({ backgroundColor: colour });
  }, [colour]);

  useEffect(() => {
    setHoverStyle(selected ? { border: '2px solid #18a0fb' } : {});
  }, [selected]);

  const changeHoverState = (state: boolean) => {
    if (!selected) {
      setHoverStyle(state ? { border: '2px solid #18a0fb' } : {});
    }
  };

  return (
    <button
      className={styles.button}
      style={{ ...hoverStyle, ...buttonColour }}
      onMouseOver={() => changeHoverState(true)}
      onMouseOut={() => changeHoverState(false)}
      onClick={onClick}
      id={id}
    ></button>
  );
};

export default ColourButton;
