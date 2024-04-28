const getClientIPAddress = (req) => {
  // Extract the IP address from the request object
  let ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  ipAddress = ipAddress.split("f:")[1];
  return ipAddress;
};

const getserverIPAddress = () => {
  const os = require("os");
  const interfaces = os.networkInterfaces();
  let addresses = [];
  for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
      let address = interfaces[k][k2];
      if (address.family === "IPv4" && !address.internal) {
        addresses.push(address.address);
      }
    }
  }

  return addresses[0];
};

module.exports = { getClientIPAddress, getserverIPAddress };
