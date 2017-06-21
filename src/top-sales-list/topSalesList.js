import React from 'react';
import Styles from './topSalesList.scss';
import axios from 'axios';
import transformData from '../utils/transformData.js';
import TopSalesItem from './topSalesItem';


// export default TopSalesList;
// write top sales list component here
class TopSalesList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    // let page load first & then re-loads with API data
    axios.get('http://localhost:3000/PurchaseOrders')
    .then((api) => {
      let newData = transformData(api.data);
      this.setState({ items: newData });
    });
  }

  render() {
      // create component TopSalesItem calls 
      const rows = [];
      // Expecting at least 10 items at our API endpoint, but to be fault-tolerant let's verify the length and iterate as many times as necessary if less than 10
      let max = this.state.items.length >= 10 ? 10 : this.state.items.length;
      for (let i = 0; i < max; i += 1) {
        rows.push(<TopSalesItem key = {i} rowNum = {i + 1} itemName = {this.state.items[i].title} itemRevenue = {this.state.items[i].revenue} />)
      }

      return ( 
        <section id={Styles.salesList}>
          <title>Top Sales Items</title>
            <table id={Styles.salesTable}>
              <theader id={Styles.tableTitle}><div>Top Sales Items</div></theader>
              <tbody>
              {rows}
              </tbody>
            </table>
        </section>
      )
  }
};

export default TopSalesList;
