import * as React from 'react';
import OwnerEditor from '../owners/OwnerEditor';


import {IGoods, IOwner} from '../../types';
import GoodsEditor from './GoodsEditor';
import {url} from '../../util';
import OwnerInformation from '../owners/OwnerInformation';
import PetsTable from '../owners/PetsTable';

interface IGoodsPageProps {
  params?: { goodsId?: string };
}

interface IGoodsPageState {
  goods?: IGoods;
}

export default class UpdateGoodsPage extends React.Component<IGoodsPageProps, IGoodsPageState> {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { params } = this.props;

    if (params && params.goodsId) {
      console.log('[vetspage] update goods page goodsId: ------------------' + params.goodsId);
      // const requestUrl = url('api/grouppurchase/getRecommendGoodItem?goodpriceid=' + this.props.params.goodsId);
      const fetchUrl = url(`api/grouppurchase/getRecommendGoodItem?goodpriceid=${params.goodsId}`);
      console.log('[vetspage] get owners');
      fetch(fetchUrl)
          .then(response => response.json())
          .then(goods => { console.log('goods', goods); this.setState({ goods }); });
    }
  }

  render() {
    const { goods } = this.state;

    if (!goods) {
      return <h2>No Goods loaded</h2>;
    }
    goods.isNew = false;

    return (
        <span>
          <GoodsEditor initialGoods={goods} />
      </span>
    );
  }
}


// export default () => <GoodsEditor initialGoods={getOldGoods()} />;