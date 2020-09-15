const date = []
const sku = []
const unitPrice = []
const quantity = []
const totalPrice = []


getData();
async function getData() {
  const response = await fetch('sales-data.txt');
  const data = await response.text();

  const rows = data.split('\n').slice(1)

  rows.forEach((row) => {
    const rows = row.split(',');
    date.push(rows[0])
    sku.push(rows[1])
    unitPrice.push(Number(rows[2]))
    quantity.push(Number(rows[3]))
    totalPrice.push(Number(rows[4]))
  });


// console.log(date);
// console.log(sku);
// console.log(unitPrice);
// console.log(quantity);
// console.log(totalPrice);

totalSales()
monthWiseTotalSales()
mostPopularItem()

}


// total sales
function totalSales() {
  let total = 0;
  for (var i = 0; i < quantity.length -1; i++) {
    total += quantity[i]
  }
  document.getElementsByClassName('one')[0].innerHTML =  total
  console.log("Total sales of the store:- " + total);
}

// monthly wise total sales
function monthWiseTotalSales() {
  let jan = 0;
  let feb = 0;
  let mar = 0;
  for (var i = 0; i < date.length-1; i++) {
    if(date[i] >= "2019-01-01" && date[i] <= "2019-01-31"){
      jan += quantity[i];
    }
    if(date[i] >= "2019-02-01" && date[i] <= "2019-02-28"){
      feb += quantity[i];
    }
    if(date[i] >= "2019-03-01" && date[i] <= "2019-03-31"){
      mar += quantity[i];
    }
  }
  console.log("Total sales of the store in January :- " +jan);
  console.log("Total sales of the store in Febraury :- "+feb);
  console.log("Total sales of the store in March :-" +mar);
  document.getElementsByClassName('two')[0].innerHTML =  jan
  document.getElementsByClassName('two')[1].innerHTML = feb
  document.getElementsByClassName('two')[2].innerHTML = mar
}

// popular item & top revenue item
function mostPopularItem() {

  const filteredSkuArrayJan = []
  const filteredSkuArrayFeb = []
  const filteredSkuArrayMar = []

  let jan = []
  let feb = []
  let mar = []
  let janRevenue = []
  let febRevenue = []
  let marRevenue = []

  let itemObjJan = {}
  let itemObjFeb = {}
  let itemObjMar = {}
  let revenueObjJan = {}
  let revenueObjFeb = {}
  let revenueObjMar = {}


    for (var i = 0; i < date.length-1; i++) {

      if(date[i] >= "2019-01-01" && date[i] <= "2019-01-31"){
        itemObjJan[sku[i]] = itemObjJan[sku[i]]?itemObjJan[sku[i]]+quantity[i]:quantity[i]
        revenueObjJan[sku[i]] = revenueObjJan[sku[i]]?revenueObjJan[sku[i]]+totalPrice[i]:totalPrice[i]
      }
      if(date[i] >= "2019-02-01" && date[i] <= "2019-02-28"){
        itemObjFeb[sku[i]] = itemObjFeb[sku[i]]?itemObjFeb[sku[i]]+quantity[i]:quantity[i]
        revenueObjFeb[sku[i]] = revenueObjFeb[sku[i]]?revenueObjFeb[sku[i]]+totalPrice[i]:totalPrice[i]
      }
      if(date[i] >= "2019-03-01" && date[i] <= "2019-03-31"){
        itemObjMar[sku[i]] = itemObjMar[sku[i]]?itemObjMar[sku[i]]+quantity[i]:quantity[i]
        revenueObjMar[sku[i]] = revenueObjMar[sku[i]]?revenueObjMar[sku[i]]+totalPrice[i]:totalPrice[i]
      }

    }


    for (var x in itemObjJan) {
      jan.push(itemObjJan[x])
      filteredSkuArrayJan.push(x)
    }

    for (var x in itemObjFeb) {
      feb.push(itemObjFeb[x])
      filteredSkuArrayFeb.push(x)
    }

    for (var x in itemObjMar) {
      mar.push(itemObjMar[x])
      filteredSkuArrayMar.push(x)
    }

    for (var x in revenueObjJan) {
      janRevenue.push(revenueObjJan[x])
    }
    for (var x in revenueObjFeb) {
      febRevenue.push(revenueObjFeb[x])
    }
    for (var x in revenueObjMar) {
      marRevenue.push(revenueObjMar[x])
    }


// find highest number in array
const LargestNum = (input)=>{
  let highNum =0;
  for (var i = 0; i < input.length; i++) {
    if(input[i]>highNum){
      highNum = input[i]
    }
  }
  return highNum;
}

// console.log(LargestNum(jan),LargestNum(feb),LargestNum(mar),Math.min(...jan),Math.min(...feb),Math.min(...mar));
// console.log(jan.indexOf(LargestNum(jan)), feb.indexOf(LargestNum(feb)), mar.indexOf(LargestNum(mar)));

const popularItemJan = filteredSkuArrayJan[jan.indexOf(LargestNum(jan))]
const popularItemFeb = filteredSkuArrayFeb[feb.indexOf(LargestNum(feb))]
const popularItemMar = filteredSkuArrayMar[mar.indexOf(LargestNum(mar))]

const topRevenueJan = filteredSkuArrayJan[janRevenue.indexOf(LargestNum(janRevenue))]
const topRevenueFeb = filteredSkuArrayFeb[febRevenue.indexOf(LargestNum(febRevenue))]
const topRevenueMar = filteredSkuArrayMar[marRevenue.indexOf(LargestNum(marRevenue))]

//  populatItem each month
console.log("Most popular item (most quantity sold) in each month:-" + popularItemJan, popularItemFeb, popularItemMar);
document.getElementsByClassName('three')[0].innerHTML = popularItemJan;
document.getElementsByClassName('three')[1].innerHTML = popularItemFeb;
document.getElementsByClassName('three')[2].innerHTML = popularItemMar;


//  top reveune item each month
console.log("Items generating most revenue in each month:-" + topRevenueJan, topRevenueFeb, topRevenueMar);
document.getElementsByClassName('four')[0].innerHTML = topRevenueJan;
document.getElementsByClassName('four')[1].innerHTML = topRevenueFeb;
document.getElementsByClassName('four')[2].innerHTML = topRevenueMar;


// min max & average of each month

function janTotalItems() {
  let janCount=0
  for (var j = 0; j < date.length-1; j++) {
    if(date[j] >= "2019-01-01" && date[j] <= "2019-01-31"){
      if(filteredSkuArrayJan[jan.indexOf(LargestNum(jan))]==sku[j]){
        janCount++
      }
    }
  }
  return janCount
}
function febTotalItems() {
  let febCount=0
  for (var j = 0; j < date.length-1; j++) {
    if(date[j] >= "2019-02-01" && date[j] <= "2019-02-28"){
      if(filteredSkuArrayFeb[feb.indexOf(LargestNum(feb))]==sku[j]){
        febCount++
      }
    }
  }
  return febCount
}
function marTotalItems() {
  let  marCount=0
  for (var j = 0; j < date.length-1; j++) {
    if(date[j] >= "2019-03-01" && date[j] <= "2019-03-31"){
      if(filteredSkuArrayMar[mar.indexOf(LargestNum(mar))]==sku[j]){
        marCount++
      }
    }
  }
  return marCount
}

const janMin = Math.min(...jan)
const janMax = LargestNum(jan)
const janAverage = LargestNum(jan)/janTotalItems()
console.log("January Min, Max & Average Data:- " + janMin, janMax, janAverage);
document.getElementsByClassName('five')[0].innerHTML = "Min :-" + janMin
document.getElementsByClassName('five')[1].innerHTML = "Max :-" + janMax
document.getElementsByClassName('five')[2].innerHTML =  "Average :- " + janAverage

const febMin = Math.min(...feb)
const febMax = LargestNum(feb)
const febAverage = LargestNum(feb)/febTotalItems()
console.log("February Min, Max & Average Data:- " + febMin, febMax, febAverage);
document.getElementsByClassName('five')[3].innerHTML ="Min :-" + febMin
document.getElementsByClassName('five')[4].innerHTML ="Max :-"+ febMax
document.getElementsByClassName('five')[5].innerHTML = "Average :-"+febAverage

const marMin = Math.min(...mar)
const marMax = LargestNum(mar)
const marAverage = LargestNum(mar)/marTotalItems()
console.log("March Min, Max & Average Data:- " + marMin, marMax, marAverage);
document.getElementsByClassName('five')[6].innerHTML ="Min :-" +  marMin
document.getElementsByClassName('five')[7].innerHTML = "Max :-"+ marMax
document.getElementsByClassName('five')[8].innerHTML = "Average :- "+ marAverage
}
