import React from 'react';
import styles from '../../Cliente_Consulta/layout.module.scss'; // Importe o CSS Module

interface StepHeaderProps {
  stepNumber: string | number;
  text: string;
  isActive: boolean;
}

const StepHeader: React.FC<StepHeaderProps> = ({ stepNumber, text, isActive }) => {
  const containerClasses = `${styles.stepContainer} ${isActive ? styles.active : ''}`;

  return (
    <div className={containerClasses}>
      <div className={styles.stepNumber}>{stepNumber}</div>
      <span className={styles.stepText}>{text}</span>
    </div>
  );
};

export default StepHeader;