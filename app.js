const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const rutasProtegidas = express.Router();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/productos');
const authRouter = require('./routes/auth')
const usuariosRouter = require('./routes/users')
const peluqueriaRouter = require('./routes/peluqueria')
const app = express();
require('dotenv').config()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/auth",authRouter);
app.use(rutasProtegidas);
app.use('/', indexRouter);
app.use('/api/products', usersRouter);
app.use('/api/users', usuariosRouter);
app.use('/api/peluqueria', peluqueriaRouter);




//token validar
rutasProtegidas.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const token = req.headers["access-token"];
  if (token) {
    jwt.verify(token, process.env.privateHashKey, (err, decoded) => {
      if (err) {
        return res.json({ msg: "Token inválida", success: false });
      } else {
        req.query = decoded;
        next();
      }
    });
  } else {
    res.json({
      msg: "Token no proveida", success: false 
    });
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({e:'error'});
});

module.exports = app;
