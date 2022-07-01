import React from 'react';

import styles from './AlertBar.module.scss';

type ComponentProps = {
  content: string;
};

const AlertBar = ({ content }: ComponentProps) => {
  return <div className={styles.container}>{content}</div>;
};

export default AlertBar;
