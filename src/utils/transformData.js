//feel free to use lodash; it provides alot of type methods that are native to other languages
import { forEach, values } from 'lodash';

// transform data if needed here
const transformData = (list) => {
  const transformedObj = {};

  // nested forEach for nested object from API to format and make usable on front-end
  // pass in only parameters that we need to minimize processing
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
      } else {
        // product ID already exists in cache -- add to current order count
        transformedObj[product_id].count += order_count;
        // store result of findRevenue method and add to current revenue property
        let revenue = findRevenue(order_count, vendor_price);
        transformedObj[product_id].revenue += revenue;
      }
    });
  });
  // plug transformedObj into lodash values method
  const transformedArr = values(transformedObj);
  // take updated transformedArr that is ready to be sorted & now sort
  const sorted = sortItems(transformedArr);
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
const formatName = (item) => {
  let transformed = item.toLowerCase().split(' ');
  console.log(transformed);
  // loop through and capitalize all first letters, avoid typically lowercased words like and & with
  for (let i = 0; i < transformed.length; i += 1) {
    if (transformed[i] !== 'and' || transformed[i] !== "w/") transformed[i] = transformed[i].charAt(0).toUpperCase() + transformed[i].slice(1);
  }
  // join back into string and return
  let proper = transformed.join(' ');
  return proper;
}

const sortItems = (arr) => {
  // sort array by revenue
  arr.sort((a, b) => {
    return b.revenue - a.revenue;
  });
  arr.map(item => {
    // iterate through and add a dollar sign to final revenue total
    return item.revenue = '$' + item.revenue;
  })
  return arr;
}

export default transformData;
