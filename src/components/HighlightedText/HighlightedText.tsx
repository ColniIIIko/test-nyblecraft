import React from 'react';

import './HighlightedText.scss';

type Props = {
  className?: string;
  text: string;
  id: number;
};

const COLORS = ['purple', 'yellow', 'green'];

function HighlightedText({ text, id, className }: Props) {
  return (
    <span className={`tag-${COLORS[id % COLORS.length]} ${className || ''}`}>{text}</span>
  );
}

export default HighlightedText;
