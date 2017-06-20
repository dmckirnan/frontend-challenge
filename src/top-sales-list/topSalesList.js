import React from 'react';
import Styles from './top_sales.scss';
import axios from 'axios';
import transformData from '../utils/transformData.js'
// import lodash


// export default TopSalesList;
// write top sales list component here
class TopSalesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }
    // make get request
    axios.get('http://localhost:3000/PurchaseOrders')
    .then((api) => {
      let newData = transformData(api.data);
      this.state.items = newData;
      this.setState(newData);
    });
  }

componentDidMount() {
  // check if retrieving new data?
}

// render method
  render() {
      return ( 
        <section>
          <h1>TopSalesList</h1>
            <table>
            
            </table>
        </section>
      )
  }

};

export default TopSalesList;