import httpStatusCodes from 'http-status-codes';

export const me = (req, res) => {
  res.status(httpStatusCodes.OK).json({ data: req.user });
};
