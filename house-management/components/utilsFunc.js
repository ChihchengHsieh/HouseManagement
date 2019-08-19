const utilsFunc = {
  latestDate(a, b) {
    if (a.createdAt > b.createdAt) {
      return -1;
    } else if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return 0;
    }
  }
};

export default utilsFunc;
