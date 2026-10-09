import { useState, type TextareaHTMLAttributes, type ChangeEvent } from 'react';
import styles from './ContactForm.module.css';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  showCharCount?: boolean;
}

export function FormTextarea({
  label,
  name,
  showCharCount = true,
  maxLength = 5000,
  id,
  className,
  value,
  defaultValue,
  onChange,
  ...rest
}: FormTextareaProps) {
  const inputId = id ?? `field-${name}`;
  const [currentLength, setCurrentLength] = useState(() => {
    if (typeof value === 'string') return value.length;
    if (typeof defaultValue === 'string') return defaultValue.length;
    return 0;
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.labelRow}>
        <span className={styles.labelText}>{label}</span>
        {showCharCount && maxLength ? (
          <span className={styles.charCount}>
            {currentLength} / {maxLength}
          </span>
        ) : null}
      </label>
      <div className={styles.inputWrapper}>
        <textarea
          id={inputId}
          name={name}
          maxLength={maxLength}
          className={`${styles.textarea} ${className ?? ''}`}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...rest}
        />
      </div>
    </div>
  );
}
