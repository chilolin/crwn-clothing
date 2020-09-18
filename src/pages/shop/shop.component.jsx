import React from "react";

import SHOP_DATA from './shop.data.js';

import CollectionPreview from '../../components/preview/collection-preview';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { component: SHOP_DATA };
  }

  render() {
    const { component } = this.state;
    return (
      <div>
        {component
          .filter((item, idx) => idx < 4)
          .map(({ id, ...otherComponentProps }) => (
            <CollectionPreview key={id} {...otherComponentProps} />
          ))}
      </div>
    );
  }
}

export default ShopPage;