import * as React from 'react';

import { IRouter, Link } from 'react-router';
import { url, submitForm } from '../../util';

import Input from '../form/Input';

import { Digits, NotEmpty } from '../form/Constraints';

import { IInputChangeHandler, IFieldError, IError, IGoods, IRouterContext } from '../../types';

interface IGoodsEditorProps {
  initialGoods?: IGoods;
}

interface IGoodsEditorState {
  goods?: IGoods;
  error?: IError;
};

export default class GoodsEditor extends React.Component<IGoodsEditorProps, IGoodsEditorState> {

  context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      goods: Object.assign({}, props.initialGoods)
    };
    console.log('[goodsEditor] on constructor goods: ', this.state.goods);
  }

  onSubmit(event) {
    event.preventDefault();

    const { goods } = this.state;

    console.log('[goodsEditor] on submit goods: ', goods);
    const url = goods.isNew ? 'api/grouppurchase/addRecommendGoodItem' : 'api/grouppurchase/updateRecommendGoodItem';
    submitForm(goods.isNew ? 'POST' : 'PUT', url, goods, (status, response) => {
      if (status === 200 || status === 201) {
        const newGoods = response as IGoods;
        this.context.router.push({
          pathname: '/goods/update/' + newGoods.goodpriceid
        });
        alert('更新成功');
      } else {
        console.log('ERROR?!...', response);
        this.setState({ error: response });
      }
    });
  }

  onInputChange(name: string, value: string, fieldError: IFieldError) {
    const { goods, error } = this.state;
    const modifiedGoods = Object.assign({}, goods, { [name]: value });
    const newFieldErrors = error ? Object.assign({}, error.fieldErrors, {[name]: fieldError }) : {[name]: fieldError };
    this.setState({
      goods: modifiedGoods,
      error: { fieldErrors: newFieldErrors }
    });
  }

// <Input object={goods} error={error} constraint={Digits(10)} label='Telephone' name='telephone' onChange={this.onInputChange} />
  render() {
    const { goods, error } = this.state;
    return (
      <span>
        <h2>{goods.isNew ? 'Add Goods' : 'Update Goods'}</h2>
        <form className='form-horizontal' method='POST' action={url('/api/grouppurchase/addRecommendGoodItem')}>
          <div className='form-group has-feedback'>
            <Input object={goods} error={error} constraint={NotEmpty} label='Title' name='title' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='Content' name='content' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='Category' name='category' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='Brand Name' name='brand' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='Album pics' name='albumpics' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='Province' name='province' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='City' name='city' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='Picture' name='pic' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='Tag' name='tag' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='Min cost' name='mincost' onChange={this.onInputChange} />
            <Input object={goods} error={error} constraint={NotEmpty} label='Max cost' name='maxcost' onChange={this.onInputChange} />
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button className='btn btn-default' type='submit' onClick={this.onSubmit}>{goods.isNew ? 'Add Goods' : 'Update Goods'}</button>
            </div>
          </div>
        </form>
      </span>
    );
  }
}