const sortedData = (req, res, next) => {
  let defaultSort = [];
  const { sortStatus, sortCreatedAt } = req.query;

  if (sortStatus)
    if (sortStatus === "1") defaultSort.push(["status", "ASC"]);
    else if (sortStatus === "-1") defaultSort.push(["status", "DESC"]);

  if (sortCreatedAt) {
    if (sortCreatedAt === "1") defaultSort.push(["createdAt", "ASC"]);
    else if (sortCreatedAt === "-1") defaultSort.push(["createdAt", "DESC"]);
  } else defaultSort.push(["createdAt", "DESC"]);

  res.sortOptions = defaultSort;

  next();
};

module.exports = sortedData;
