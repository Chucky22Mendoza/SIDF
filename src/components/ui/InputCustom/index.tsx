import { cn } from '@/lib/utils';
import styles from './InputCustom.module.css';

/**
 * Defines the properties for the Input component.
 *
 * label: The label text for the input.
 * styleParent: The CSS properties for the parent element.
 * errorText: The text to display when an error occurs.
 * onChange: The function called when the input value changes.
 * hasError: Indicates if the input has an error.
 * ref: The legacy reference to the input element.
 */
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string;
  styleParent?: React.CSSProperties;
  errorText?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  ref?: React.LegacyRef<HTMLInputElement>;
  onlyNumbers? : boolean
};

/**
 * Functional component for rendering a text input field with optional label and error handling.
 * @param props - The input properties including styleParent, onChange, errorText, hasError, and label.
 */
function InputCustom(props: InputProps) {
  const {
    styleParent,
    onChange,
    errorText,
    hasError = false,
    label,
    className,
  } = props;
  let propsInput = {...props};
  delete propsInput.errorText;
  delete propsInput.styleParent;
  delete propsInput.hasError;
  delete propsInput.label;
  delete propsInput.className;

  const shouldDisplayLabel = label && label !== '';

  const onKeyDownNumberHandler = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.ctrlKey && (e.key === 'v' || e.key === 'V')) {
      return;
    }

    const allowedKeys = ['Backspace', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Home', 'End', 'Tab'];
    if (!allowedKeys.includes(e.key)) {
      if (isNaN(Number(e.key))) {
        e.preventDefault();
      }
    }
  };

  return (
    <div
      className={cn(
        `${styles['input-container']} ${hasError ? styles.error : ''}`,
        className,
      )}
      style={styleParent}
    >
      <input
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        )}
        ref={props.ref}
        required
        {...propsInput}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={props.onlyNumbers ? onKeyDownNumberHandler : props.onKeyDown}
      />
      {shouldDisplayLabel && (
        <label htmlFor={props.id}>
          {label}
        </label>
      )}
      {errorText && <div className={styles.helper}>{hasError && <span>{errorText}</span>}</div>}
    </div>
  );
}

export default InputCustom;
