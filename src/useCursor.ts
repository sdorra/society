import { useCallback, useEffect, useState } from 'react';
import { Editor, NodeEntry, Text, Path, Range } from 'slate';

import { User } from '.';
import { Connection } from './connection';

type Collaborator = {
  user: User;
  cursor: Range;
};

const useCursor = (connection: Connection) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  useEffect(() => {
    connection.awareness.on('change', () => {
      const states = connection.awareness.getStates();
      const remotes: Collaborator[] = [];
      states.forEach((collaborator, id) => {
        if (collaborator.cursor && id !== connection.awareness.clientID) {
          remotes.push(collaborator as Collaborator);
        }
      });
      setCollaborators(remotes);
    });
  }, []);

  const updateCursorPosition = (editor: Editor) => {
    connection.awareness.setLocalStateField('cursor', editor.selection);
  };

  const decorate = useCallback(
    ([node, path]: NodeEntry) => {
      const ranges: Range[] = [];
      if (collaborators.length > 0 && Text.isText(node)) {
        collaborators.forEach(collaborator => {
          if (Range.includes(collaborator.cursor, path)) {
            const { focus, anchor } = collaborator.cursor;

            // TODO ??
            const isForward = true;

            const isFocusNode = Path.equals(focus.path, path);
            const isAnchorNode = Path.equals(anchor.path, path);

            ranges.push({
              ...collaborator,
              isForward,
              isCaret: isFocusNode,
              anchor: {
                path,
                offset: isAnchorNode
                  ? anchor.offset
                  : isForward
                  ? 0
                  : node.text.length,
              },
              focus: {
                path,
                offset: isFocusNode
                  ? focus.offset
                  : isForward
                  ? node.text.length
                  : 0,
              },
            });
          }
        });
      }
      return ranges;
    },
    [collaborators]
  );

  return {
    updateCursorPosition,
    decorate,
  };
};

export default useCursor;
