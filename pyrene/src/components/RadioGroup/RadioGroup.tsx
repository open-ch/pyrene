import React from 'react';
import clsx from 'clsx';

import RadioButton, { RadioButtonBaseProps } from '../RadioButton/RadioButton';

import styles from './radioSelection.css';

export interface RadioGroupProps {
  /**
   * Sets the orientation of the radio group.
   */
  alignment?: 'vertical' | 'horizontal',
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Sets the visual appearance, to signal that the radio group is invalid.
   */
  invalid?: boolean,
  /**
   * Sets the html name property of the form element.
   */
  name?: string,
  /**
   * Javascript onBlur event handler.
   */
  onBlur?: () => void,
  /**
   * Javascript onchange event handler.
   */
  onChange: (value: number | string, event: React.ChangeEvent<HTMLInputElement>) => void,
  /**
   * Set the values that the user can choose from.
   */
  options?: RadioButtonBaseProps[],
  /**
   * Sets the title above the input field.
   */
  title?: string,
  /**
   * Sets the selected choice of the user.
   */
  value?: number | string,
}

type HoveredState = { [key: string]: boolean };

/**
 * RadioGroup creates a collection of radio buttons that allow the user to select an option from a set.
 * Use RadioGroup if you need to see all available options.
 *
 * If the available options can be collapsed, you should use a drop-down menu instead because it takes up less space.
 */
const RadioGroup: React.FC<RadioGroupProps> = ({
  options = [],
  disabled = false,
  alignment = 'vertical',
  title = '',
  value = '',
  invalid = false,
  name = '',
  onChange = () => null,
  onBlur = () => null,
}: RadioGroupProps) => {

  const [hovered, setHovered] = React.useState<HoveredState>({});

  const onMouseEnter = (key: string) => setHovered((prevHovered) => ({
    ...prevHovered,
    [key]: true,
  }));

  const onMouseLeave = (key: string) => {
    setHovered(({ [key]: prev, ...prevHovered }) => prevHovered);
  };

  const lastElementIndex = options.length - 1;

  return (
    <div
      className={styles.radioSelectionContainer}
      onBlur={onBlur}
      id={name}
    >
      {title && <div className={styles.radioGroupTitle}>{title}</div>}
      <div className={clsx(styles.radioGroupContainer, styles[`alignment-${alignment}`])}>
        {options.map((option, index) => {
          const key = `radio_${option.label ?? ''}_${option.value}`;

          return (
            <React.Fragment key={key}>
              <div
                className={styles.radioContainer}
                onMouseEnter={() => onMouseEnter(key)}
                onMouseLeave={() => onMouseLeave(key)}
              >
                <RadioButton
                  checked={value === option.value}
                  disabled={option.disabled || disabled}
                  hovered={hovered}
                  invalid={option.invalid || invalid}
                  label={option.label}
                  name={name}
                  onChange={((val, event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value, event))}
                  readonly={option.readonly}
                  value={option.value}
                />
              </div>
              {index !== lastElementIndex && <div className={styles[`spacer-${alignment}`]} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

RadioGroup.displayName = 'Radio Group';

export default RadioGroup;
