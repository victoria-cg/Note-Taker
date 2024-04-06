//export a function to make a unique id with random string of numbers and letters, as in class activity 22
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);