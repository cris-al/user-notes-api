const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`);
  });
});
