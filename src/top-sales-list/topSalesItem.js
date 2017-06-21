import React from 'react';
import Styles from './topSalesList.scss';

// create stateless dumb component TopSalesItem
const TopSalesItem = (props) => {
  return (
    <tr className={Styles.tableRow}>
      <td><div className={Styles.rowNum}>{props.rowNum}</div></td>
      <td><div className={Styles.itemName}>{props.itemName}</div><div className={Styles.itemRevenue}>{props.itemRevenue}</div></td>
    </tr>
  )
}

export default TopSalesItem;
