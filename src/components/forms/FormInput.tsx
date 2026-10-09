import type { InputHTMLAttributes } from 'react';
import styles from './ContactForm.module.css';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  optional?: boolean;
}

export function FormInput({ label, name, optional, required, id, className, ...rest }: FormInputProps) {
  const inputId = id ?? `field-${name}`;

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.labelRow}>
        <span className={styles.labelText}>{label}</span>
        {optional ? <span className={styles.optionalTag}>Optional</span> : null}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          name={name}
          required={required}
          className={`${styles.input} ${className ?? ''}`}
          {...rest}
        />
      </div>
    </div>
  );
}
