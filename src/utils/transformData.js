//feel free to use lodash; it provides alot of type methods that are native to other languages
import {forEach} from 'lodash';

// transform data if needed here
const transformData = (list) => {
  const transformedObj = {};

  forEach(list, (order) => {
    forEach(order.products, (item) => {
      if (!transformedObj[item.product_id]) {
        transformedObj[item.product_id] = {};
        transformedObj[item.product_id].count = products.order_count;
        // pass item name into formatName method and store in title property
        transformedObj[item.product_id]. = formatName(item.name);
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

  const sorted = sortItems(transformedObj);
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
    transformed.map(word => {
      // avoid capitalizing preposition 'and'
      if (word !== 'and') return word.charAt(0).toUpperCase() + word.slice(1);
      // if word === 'and' simply return it
      else return word;
    })
    transformed.join(' ');
    return transformed;
  }
  // return out sorted & name formatted array of objects
  return sorted;
}

export default transformData;
