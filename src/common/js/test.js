var counter = 3;
function addCounter(a) {
  console.log('addCounter------');
  // counter = 8;
  counter = a + 8;
}
module.exports = {
  counter,
  getCounter: addCounter
}