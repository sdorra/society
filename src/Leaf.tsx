import React, { FC } from 'react';
import { RenderLeafProps } from 'slate-react';
import { User } from '.';
import Caret from './Caret';
import { Text } from 'slate';

type CaretLeaf = Text & {
  user: User;
  isForward: boolean;
};

const Leaf: FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      style={
        {
          position: 'relative',
          backgroundColor: leaf.alphaColor,
        } as any
      }
    >
      {leaf.isCaret ? <Caret {...(leaf as CaretLeaf)} /> : null}
      {children}
    </span>
  );
};

export default Leaf;
