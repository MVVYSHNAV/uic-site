import styles from './ContactForm.module.css';

interface ServiceSelectorProps {
  label: string;
  name: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function ServiceSelector({
  label,
  name,
  options,
  selected,
  onSelect,
}: ServiceSelectorProps) {
  return (
    <div className={styles.chipsContainer}>
      <input type="hidden" name={name} value={selected} />
      <div className={styles.labelRow}>
        <span className={styles.labelText}>{label}</span>
      </div>
      <div className={styles.chipsGrid} role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.chip} ${isSelected ? styles.chipActive : ''}`}
              onClick={() => onSelect(option)}
            >
              <span className={styles.chipDot} aria-hidden="true" />
              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
