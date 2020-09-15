module.exports = {
  'GET /user': { code: 0, msg: 'success', data: { name: 'houyangguang' } },
  'POST /login/account': (req, res) => {
    return res.send({
      status: 'ok',
      code: 0,
      token: 'hello houyangguang',
      data: { id: 1, name: 'hello world' },
    })
  },
}
