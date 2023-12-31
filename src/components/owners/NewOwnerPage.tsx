import * as React from 'react';
import OwnerEditor from './OwnerEditor';

import { IOwner } from '../../types';

const newOwner = (): IOwner => ({
  id: null,
  isNew: true,
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  mobile: '',
  // pets: []
});

export default () => <OwnerEditor initialOwner={newOwner()} />;