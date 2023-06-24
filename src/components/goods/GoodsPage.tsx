import * as React from 'react';

import { IRouter, Link } from 'react-router';
import { url } from '../../util';

import {IGoods} from '../../types';

interface IGoodsPageState {
  goods: IGoods[];
}

export default class GoodsPage extends React.Component<void, IGoodsPageState> {
  constructor() {
    super();

    this.state = { goods: [] };
  }

  componentDidMount() {
    // const requestUrl = url('api/vets');
    const requestUrl = url('api/grouppurchase/getRecommendGoodPriceList?type=-1&currentIndex=0&citycode=allCode');

    console.log('[vetspage] getRecommendGoodPriceList ------------------');
    fetch(requestUrl)
      .then(response => response.json())
      .then(goods => { console.log('goods', goods); this.setState({ goods: goods.data }); });
  }

  render() {
    const { goods } = this.state;

    if (!goods) {
      return <h2>Veterinarians</h2>;
    }

    return (
      <span>
        <h2>Veterinarians</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>商品号</th>
              <th>标题</th>
              <th>内容</th>
              <th>品牌</th>
              <th>图片集</th>
              <th>省份</th>
              <th>城市</th>
              <th>封面(pic)</th>
              <th>标签(tag)</th>
              <th>最低价</th>
              <th>最高价</th>
            </tr>
          </thead>
          <tbody>

            {goods.map(good => (
              <tr key={good.goodpriceid}>
                <td>
                  <a href={`/goods/update/${good.goodpriceid}`}>
                    {good.goodpriceid}
                  </a>
                </td>
                <td>{good.title}</td>
                <td>{good.content}</td>
                <td>{good.brand}</td>
                <td>{good.albumpics}</td>
                <td>{good.province}</td>
                <td>{good.city}</td>
                <td>{good.pic}</td>
                <td>{good.tag}</td>
                <td>{good.mincost}</td>
                <td>{good.maxcost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link className='btn btn-default' to='/goods/new'> Add Goods</Link>
      </span>
    );
  }
// <td>{vet.specialties.length > 0 ? vet.specialties.map(specialty => specialty.name).join(', ') : 'none'}</td>
}
