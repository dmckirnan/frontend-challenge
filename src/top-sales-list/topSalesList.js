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

    axios.get('http://localhost:3000/PurchaseOrders')
    .then((data) => {
      let newData = transformData();
      this.state.items = newData;
      this.setState(this.state.items);
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