import { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { SyncElement, toSharedType } from 'slate-yjs';
import { Awareness } from 'y-protocols/awareness';
import { YArray } from 'yjs/dist/src/internals';

export type User = {
  name: string;
  color: string;
};

export type Connection = {
  sharedType: YArray<SyncElement>;
  awareness: Awareness;
};

const useConnection = (user: User) => {
  const [connection, setConnection] = useState<Connection>();
  useEffect(() => {
    const ydoc = new Y.Doc();

    const provider = new WebrtcProvider('society', ydoc);
    provider.awareness.setLocalStateField('user', user);
    provider.connect();

    const sharedType = ydoc.getArray<SyncElement>('society');

    // wait unit we are connected
    const initializerInterval = setInterval(() => {
      if (provider.connected) {
        clearInterval(initializerInterval);
        // initialize array if it is empty,
        // because slate will fail without a text block
        if (sharedType.length == 0) {
          toSharedType(sharedType, [
            { type: 'paragraph', children: [{ text: 'Hello world!' }] },
          ]);
        }
      }
    }, 100);

    setConnection({
      sharedType,
      awareness: provider.awareness,
    });

    return () => {
      provider.disconnect();
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.awareness.setLocalStateField('user', user);
    }
  }, [user, connection]);

  return connection;
};

export default useConnection;
