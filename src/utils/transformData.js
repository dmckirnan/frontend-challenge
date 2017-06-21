import { forEach, values } from 'lodash';

// transform data if needed here
const transformData = (orders) => {
  const productObj = {};
  // nested forEach for nested object from API to format and make usable on front-end
  // pass in only parameters that we need to minimize processing
  forEach(orders, ({ products }) => {
    forEach(products, ({ product_id, name, order_count, vendor_price }) => {
      if (!productObj[product_id]) {
        productObj[product_id] = {};
        productObj[product_id].count = order_count;
        // pass product name into formatName method and store in title property
        productObj[product_id].title = formatName(name);
        // pass revenue info into findREvenue method and store result in revenue property
        let revenue = findRevenue(order_count, vendor_price);
        productObj[product_id].revenue = revenue;
      } else {
        // product ID already exists in cache -- add to current order count
        productObj[product_id].count += order_count;
        // store result of findRevenue method and add to current revenue property
        let revenue = findRevenue(order_count, vendor_price);
        productObj[product_id].revenue += revenue;
      }
    });
  });
  // plug productObj into lodash values method
  const productArr = values(productObj);
  // take updated productArr that is ready to be sorted & now sort
  const sorted = sortItems(productArr);
  // return out sorted & name formatted array of objects
  return sorted;
}

// find revenue value to be displayed
// Display revenue --> Product.order_count * (Product.order_price.value / 10 ^ Product.order_price.scale)
const findRevenue = (count, vendor) => {
  let revenue = count * (vendor.value / Math.pow(10, vendor.scale));
  return revenue;
}

// format name for list display
const formatName = (name) => {
  // split each element, lowercase every character, map through array element & capitalize each first letter of each word
  // join string back together & return
  let formatted = name.toLowerCase().split(' ').map(string => {
    if (string !== 'and') return string.charAt(0).toUpperCase() + string.slice(1);
    else return string;
  }).join(' ');
  return formatted;
}

const sortItems = (arr) => {
  // sort array by revenue (greatest to least) & then iterate through an add dollar sign to front of revenue amount
  arr.sort((a, b) => { return b.revenue - a.revenue }).map(item => { return item.revenue = '$' + item.revenue });
  return arr;
}

export default transformData;
