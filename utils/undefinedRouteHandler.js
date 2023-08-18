const undefinedRouteHandler = (req, res, next) => {
  res.status(404).json({ error: { message: "Not found" } });
};

module.exports = undefinedRouteHandler;
