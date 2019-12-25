const express = require('express'),
  app = express(),
  request = require('request')

const host = '127.0.0.1'
const port = 7000
const api_url = 'http://www.some-url.ru/cgi-bin/dsp.pl'
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('views', './views')
app.set('view engine', 'handlebars')
app.enable('view cache')

app.get('/home', (req, res) => {
  res.status(200).type('text/plain')
  res.send('Home page from Express!')
})

app.get('/about', (req, res) => {

  request.post(
    {
      url: api_url,
      form: {
        cl: 'callback',
        event: 'ofd_callback',
      }
    },
    (err, response, body) => {
      if (err) return res.status(500).send({ message: err })
      // console.log(body)
      return res.render('about', { title: 'Get url from S2U', body: body })
    }
  )

})

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

app.listen(port, host, function() {
  console.log(`Server listens http://${host}:${port}`)
})