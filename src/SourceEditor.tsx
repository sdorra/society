import React, { FC, useMemo, useState } from 'react';
import { Node, createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withYjs } from 'slate-yjs';
import { Connection } from './connection';
import useCursor from './useCursor';
import Leaf from './Leaf';

type Props = {
  connection: Connection;
};

const SourceEditor: FC<Props> = ({ connection }) => {
  const [value, setValue] = useState<Node[]>([]);
  const { updateCursorPosition, decorate } = useCursor(connection);
  const editor = useMemo(
    () => withYjs(withReact(createEditor()), connection.sharedType),
    [connection.sharedType]
  );

  const onChange = (newValue: Node[]) => {
    if (newValue && newValue.length > 0) {
      setValue(newValue);
    }
    updateCursorPosition(editor);
  };

  return (
    // Add the editable component inside the context.
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable renderLeaf={props => <Leaf {...props} />} decorate={decorate} />
    </Slate>
  );
};

export default SourceEditor;
