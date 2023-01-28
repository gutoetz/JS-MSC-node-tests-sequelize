const express = require('express');
const authRoutes = require('./routes/loginAuth.routes')
// ...

const app = express();

app.use(express.json());

// ...

app.use('/login', authRoutes)

app.use((error, req, res, _next) => {
    const newError = JSON.parse(error.message);
    if (newError) {
      return res.status(newError.status).json({ message: newError.message });
    }
    return res.status(500).json({ message: 'internal service error' });
  });
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
