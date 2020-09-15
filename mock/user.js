module.exports = {
  'GET /user': { code: 1, msg: 'success', data: { name: 'houyangguang' } },
  'POST /login/account': (req, res) => {
    return res.send({
      status: 'ok',
      code: 1,
      token: 'hello houyangguang',
      data: { id: 1, name: 'hello world' },
    })
  },
}
