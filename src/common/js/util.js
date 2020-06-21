import _ from 'lodash';
// shuffle在lodash里边有，这里就是自己实现以下
let a = 2;
export const shuffle = (arr) => {
  const cloneArr = arr.slice(0);
  let len = arr.length;
  while (len > 1) {
    const currentIndex = Math.floor(Math.random() * len--);
    [cloneArr[len], cloneArr[currentIndex]] = [cloneArr[currentIndex], cloneArr[len]];
  }
  return cloneArr;
};
// 从总数中筛选多少个不重复的随机数
export const randomBySum = (num, sum) => {
  a++;
  const arr = [];
  const resArr = [];
  for (let i = 0; i < sum; i++) {
    arr.push(i);
  }
  for (let j = 0; j < num; j++) {
    const randomNum = _.random(sum - 1);// lodash的random两边是闭区间
    if (resArr.indexOf(arr[randomNum]) === -1) {
      resArr.push(arr[randomNum]);
    } else {
      // 如果相同，重置索引，并开始下一次循环
      j = j - 1;
      continue;
    }
  }
  return resArr;
};
export const aa = () => {
  return {
    a
  };
};
