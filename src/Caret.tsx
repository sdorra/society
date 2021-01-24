import React, { CSSProperties, FC } from 'react';
import { User } from '.';

const cursorStyleBase: CSSProperties = {
  position: 'absolute',
  top: -2,
  pointerEvents: 'none',
  userSelect: 'none',
  transform: 'translateY(-100%)',
  fontSize: 10,
  color: 'white',
  background: 'palevioletred',
  whiteSpace: 'nowrap',
};

const caretStyleBase: CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  userSelect: 'none',
  height: '1.2em',
  width: 2,
  background: 'palevioletred',
};

type Props = {
  user: User;
  isForward: boolean;
};

const Caret: FC<Props> = ({ user, isForward }) => {
  const cursorStyles = {
    ...cursorStyleBase,
    background: user.color,
    left: isForward ? '100%' : '0%',
  };
  const caretStyles = {
    ...caretStyleBase,
    background: user.color,
    left: isForward ? '100%' : '0%',
  };

  caretStyles[isForward ? 'bottom' : 'top'] = 0;

  return (
    <span contentEditable={false} style={caretStyles}>
      <span style={{ position: 'relative' }}>
        <span contentEditable={false} style={cursorStyles}>
          {user.name}
        </span>
      </span>
    </span>
  );
};

export default Caret;
