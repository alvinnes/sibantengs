const response = (res, data, totalData, message) => {
  return res.json({
    status: res.statusCode,
    totalData: totalData,
    payload: data,
    message,
  });
};

export default response;
