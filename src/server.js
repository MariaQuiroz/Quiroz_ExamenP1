require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3026;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});