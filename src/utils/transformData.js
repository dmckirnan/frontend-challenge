//feel free to use lodash; it provides alot of type methods that are native to other languages
import {forEach, values} from 'lodash';

// transform data if needed here
const transformData = (list) => {
  const transformedObj = {};

  // nested forEach for nested object from API to format and make usable on front-end
  // will sort after and return out sorted result
  forEach(list, ({ products }) => {
    forEach(products, ({ product_id, name, order_count, vendor_price }) => {
      if (!transformedObj[product_id]) {
        transformedObj[product_id] = {};
        transformedObj[product_id].count = order_count;
        // pass item name into formatName method and store in title property
        transformedObj[product_id].title = formatName(name);
        // store the result of findRevenue method and store in revenue property
        let revenue = findRevenue(order_count, vendor_price);
        transformedObj[product_id].revenue = revenue;
      }
      else {
        // product ID already exists in cache -- add to current order count
        transformedObj[product_id].count += order_count;
        // store result of findRevenue method and add to revenue property
        let revenue = findRevenue(order_count, vendor_price);
        transformedObj[product_id].revenue += revenue;
      }
    });
  });
    // sort the transformedObj
  const transformedArr = values(transformedObj);
  const sorted = sortItems(transformedArr);
  // return out sorted & name formatted array of objects
  return sorted;
}

  // find revenue value to be displayed
  // Display revenue --> Product.order_count * (Product.order_price.value / Product.order_price.scale)
  const findRevenue = (count, vendor) => {
    let revenue = count * (vendor.value / Math.pow(10, vendor.scale));
    return revenue;
  }

  // format name for list display
  const formatName = (item) => {
    // capitalize all first letters
    let lower = item.toLowerCase();
    let transformed = lower.split(' ');
    // map through transformed array and uppercase each first letter
    transformed.map((word) => {
      // avoid captalizing 'and'
      // if word === 'and' simply return it
      return word === 'and' ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    let proper = transformed.join(' ');
    return proper;
  }

  // Product.order_count determines list from top to bottom (greatest count at top) 
  const sortItems = (arr) => {
    // sort array by order count (greatest to least)
    arr.sort((a, b) => {
      return b.count - a.count;
    });
  }

export default transformData;
