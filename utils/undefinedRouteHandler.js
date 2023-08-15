const undefinedRouteHandler = (res) => {
  res.status(404).json({ error: { message: "Not found" } });
};

module.exports = undefinedRouteHandler;
