/*
POST /api/auth/info
{
  username,
  password
}
*/

module.exports = (req, res) => {
  console.log(req.headers);
  res.json({
      success: true,
      info: req.userInfo
  });
};
