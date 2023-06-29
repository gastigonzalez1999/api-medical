import { response } from 'express';


export const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'The role wants to be validated before the token'
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not admin`
    });
  }

  next();
};

export const hasRole = (...roles: string[]) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'The role wants to be validated before the token'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The servuice requires on of these roles ${roles}`
      });
    }

    next();
  }

};
