const os = require("os");

const getClientIPAddress = (req) => {
  // Extract the IP address from the request object
  let ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  ipAddress = ipAddress.split('f:')[1];
  return ipAddress;
};

// const getServerIPAddress = () => {
//   const networkInterfaces = os.networkInterfaces();
//   let ipAddress = "127.0.0.1"; // Default to localhost if IP address is not found

//   // Loop through all the network interfaces to find a non-internal IPv4 address
//   for (const interfaceName in networkInterfaces) {
//     const interfaces = networkInterfaces[interfaceName];
//     for (const iface of interfaces) {
//       if (!iface.internal && iface.family === "IPv4") {
//         ipAddress = iface.address;
//         break;
//       }
//     }
//   }

//   return ipAddress;
// };

module.exports = getClientIPAddress;
// module.exports = getServerIPAddress;
