module.exports = {
  'GET /user': { name: 'houyangguang' },
  'POST /login/account': (req, res) => {
    return res.send({
      status: 'ok',
      code: 0,
      token: 'hello houyangguang',
      data: { id: 1, name: '刘小夕' },
    })
  },
}
