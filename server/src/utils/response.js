const response = (res, data, message) => {
  return res.json({
    payload: data,
    message,
    status: res.statusCode,
  });
};

export default response;
