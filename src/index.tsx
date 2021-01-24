import React, { FC } from 'react';

import SourceEditor from './SourceEditor';
import useConnection, { User } from './connection';

type Props = {
  user: User;
};

const Editor: FC<Props> = ({ user }) => {
  const connection = useConnection(user);

  if (!connection) {
    return <p>Connecting ...</p>;
  }

  return <SourceEditor connection={connection} />;
};

export { User };
export default Editor;
