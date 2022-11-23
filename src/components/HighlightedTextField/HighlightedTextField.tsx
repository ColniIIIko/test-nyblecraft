import React, { useEffect, useRef, useCallback, useState } from 'react';

import { parseToComponents } from '@/utils/parseToComponents';
import './HighlightedTextField.scss';

type Props = {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  setHighlighted: React.Dispatch<React.SetStateAction<string[]>>;
  regex: RegExp;
  Component: React.FC<{ text: string; id: number }>;
};

function HighlightedTextField({
  onChange,
  value,
  className,
  regex,
  setHighlighted,
  Component,
}: Props) {
  const textFieldRef = useRef<HTMLTextAreaElement>(null);
  const [textComponents, setTextComponents] = useState<string[]>(
    parseToComponents(value, regex)
  );

  useEffect(() => {
    const textField = textFieldRef.current;
    if (textField) {
      textField?.setSelectionRange(textField?.value.length, textField?.value.length);
    }
  }, [textFieldRef]);

  useEffect(() => {
    setHighlighted(
      Array.from(
        new Set(textComponents.filter((c) => regex.test(c)).map((c) => c.trim()))
      )
    );
  }, [textComponents]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextComponents(parseToComponents(e.target.value, regex));
      onChange && onChange(e);
    },
    [onChange, regex]
  );

  return (
    <>
      <div
        className={`field-wrapper ${className || ''}`}
        onClick={() => textFieldRef.current?.focus()}
      >
        <textarea
          value={value}
          ref={textFieldRef}
          style={{ opacity: 0, width: 0, height: 0, position: 'fixed', zIndex: -100 }}
          onChange={handleChange}
        ></textarea>
        <p className='text-field'>
          {textComponents.map((component, index) =>
            regex.test(component) ? (
              <Component
                key={Date.now().toString(16) + Math.random()}
                text={component}
                id={index}
              />
            ) : (
              component
            )
          )}

          <span className='text-field__cursor'> </span>
        </p>
      </div>
      <p className='warning-message'>
        *navigation with arrows and selection dont work in the input above {':)'}
      </p>
    </>
  );
}

export default HighlightedTextField;
