const responseMainData = (
  res,
  data,
  { totalPage, totalData, page, limit },
  message
) => {
  return res.json({
    totalData,
    message,
    status: res.statusCode,
    payload: data,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      prevPage: page - 1,
      totalPage,
    },
  });
};

export default responseMainData;
