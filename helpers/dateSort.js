export var dateAscendingSort= function (a, b) {
    if (a.startDate > b.startDate) {
      return  1;
    } else if (a.startDate < b.startDate) {
      return -1;
    } else {
      if (a.startTime > b.startTime) {
        return 1;
      } else if (a.startTime < b.startTime) {
        return -1;
      } else {
        return 0;
      }
    }
  }

//   module.exports = dateAscendingSort;