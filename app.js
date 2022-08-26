const { application } = require("express");
const express = require("express");
const app = express();
const { infoCursos } = require("./data.js");

app.get("/", (req, res) => {
  // HOME '/'
  res.send("welcome to the jungle");
});
app.get("/api/cursos", (req, res) => {
  // API CURSOS
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(infoCursos));
});

////////////////////////////////////////////////////////////////////////////////////
app.get("/api/cursos/programacion", (req, res) => {
  // CURSOS PROGRAMACION
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(infoCursos.programacion));
});
app.get("/api/cursos/programacion/:lenguaje", (req, res) => {
  // CURSOS PROGRAMACION (/:LENGUAJE)
  const lenguaje = req.params.lenguaje;
  let resultados = infoCursos.programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(resultados));
});
app.get("/api/cursos/programacion/:lenguaje/:nivel", (req, res) => { /// CURSOS PROGRAMACION NIVEL
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;

  const resultados = infoCursos.programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );

  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron de ${lenguaje} de nivel ${nivel}`);
  }

  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(resultados));
});
////////////////////////////////////////////////////////////////////////////////////////
app.get("/api/cursos/matematicas", (req, res) => {
  /// MATHS TODOS LOS CURSOS
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(infoCursos.matematicas));
});
app.get("/api/cursos/matematicas/:tema", (req, res) => {
  // MATHS CURSO (/:TEMA)
  const tema = req.params.tema;
  let resultados = infoCursos.matematicas.filter(
    (curso) => curso.tema === tema
  );

  if (resultados.length === 0) {
    return res.send(`No se encontro ${tema}.`);
  }
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(resultados));
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
