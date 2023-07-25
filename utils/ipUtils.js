// ipUtils.js
const getIPAddress = (req) => {
  // Extract the IP address from the request object
  const ipAddress =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress 

  // return ipAddress.replace('::ffff:', '');
  return ipAddress;
};

module.exports = getIPAddress;
