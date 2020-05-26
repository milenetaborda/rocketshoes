import React, {Component} from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';
import * as CartActions from '../../store/modules/cart/actions';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: []
  }

  async componentDidMount(){
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }))

    this.setState({ products: data});
  }

  handleAddProdut = product => {
    const { addToCart } = this.props;

    addToCart(product);
  };

  render() {
    const { products } = this.state;
    console.log(products)

    return(
      <ProductList>

        { products.map(product => (
          <li key={product.id}>
            <img src={product.image}
            alt={product.title}
          />

          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => this.handleAddProdut(product)}>
            <div>
              <MdShoppingBasket size={16} color="#fff"/> 3
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
      </li>
        ))}

    </ProductList>
    )
  }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators( CartActions , dispatch);

export default connect(null, mapDispatchToProps)(Home);
