//feel free to use lodash; it provides alot of type methods that are native to other languages
import {forEach, Map} from 'lodash';

// transform data if needed here
const transformData = (list) => {
  const transformedObj = {};

  // nested forEach for nested object from API to format and make usable on front-end
  // will sort after and return out sorted result
  forEach(list, (order) => {
    forEach(order.products, (item) => {
      if (!transformedObj[item.product_id]) {
        transformedObj[item.product_id] = {};
        transformedObj[item.product_id].count = products.order_count;
        // pass item name into formatName method and store in title property
        transformedObj[item.product_id].title = formatName(item.name);
        // store the result of findRevenue method and store in revenue property
        let revenue = findRevenue(item);
        transformedObj[item.product_id].revenue = revenue;
      }
      else {
        // product ID already exists in cache -- add to current order count
        transformedObj[item.product_id].count += products.order.count;
        // store result of findRevenue method and add to revenue property
        let revenue = findRevenue(item);
        transformedObj[item.product_id].revenue += revenue;
      }
    });
  });

  // find revenue value to be displayed
  // Display revenue --> Product.order_count * (Product.order_price.value / Product.order_price.scale)
  const findRevenue = (item) => {
    let revenue = item.order_count * (item.vendor_price.value / item.order_price.scale);
    return revenue;
  }

  // format name for list display
  const formatName = (item) => {
    // capitalize all first letters
    let lower = item.toLowerCase();
    let transformed = lower.split(' ');
    // map through transformed array and uppercase each first letter
    map(transformed, (word) => {
      // avoid captalizing 'and'
      // if word === 'and' simply return it
      return word === 'and' ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    let proper = transformed.join(' ');
    return proper;
  }

  // Product.order_count determines list from top to bottom (greatest count at top) 
  const sortItems = (obj) => {
    const arr = [];
    // iterate through obj input and push to arr
    forEach(obj, (item) => {
      arr.push(item);
    });
    // sort array by order count (greatest to least)
    arr.sort((a, b) => {
      return b.count - a.count;
    });
    return arr;
  }

  // sort the transformedObj
  const sorted = sortItems(transformedObj);
  // return out sorted & name formatted array of objects
  return sorted;
}

export default transformData;
