const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const { user } = req;
    if (!user || !allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

export default authorizeRoles;
