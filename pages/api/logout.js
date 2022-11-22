import cookie from 'cookie';

function handlerLogout(req, res) {
  res
    .status(200)
    .setHeader(
      'Set-Cookie',
      cookie.serialize('jwt', '', { path: '/api', expire: new Date(0) })
    )
    .json({});
}
export default handlerLogout;
