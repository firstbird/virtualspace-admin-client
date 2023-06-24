import * as React from 'react';
import OwnerEditor from '../owners/OwnerEditor';

import {IGoods, IOwner} from '../../types';
import GoodsEditor from './GoodsEditor';

const newGoods = (): IGoods => ({
  id: null,
  isNew: true,
  goodpriceid: '',
  title: '',
  content: '',
  category: 0,
  brand: '',
  albumpics: '',
  province: '',
  city: '',
  pic: '',
  tag: '',
  mincost: 0,
  maxcost: 0,
});

export default () => <GoodsEditor initialGoods={newGoods()} />;