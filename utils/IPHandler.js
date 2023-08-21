const getClientIPAddress = (req) => {
  // Extract the IP address from the request object
  let ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  ipAddress = ipAddress.split('f:')[1];
  return ipAddress;
};

module.exports = getClientIPAddress;
