import React from 'react';
import Styles from './topSales.scss';

// create stateless dumb component TopSalesItem
// allows for better scaling if you want to add features or multiple developers want to work upon this
const TopSalesItem = (props) => {
  return (
    <tr className={Styles.tableRow}>
      <div className={Styles.rowNum}>{i + 1}</div>
      <div className={Styles.itemName}>{props.itemName}</div>
      <div className={Styles.itemRevenue}>{props.itemRevenue}</div>
    </tr>
  )
}

export default TopSalesItem;