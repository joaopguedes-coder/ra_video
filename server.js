import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "apiusuarios",
  password: "SUA_SENHA",
  port: 5432
});

// GET
app.get("/usuarios", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM usuarios ORDER BY id"
    );

    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// POST
app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email } = req.body;

    await pool.query(
      "INSERT INTO usuarios (nome, email) VALUES ($1, $2)",
      [nome, email]
    );

    res.json({
      mensagem: "Usuário cadastrado com sucesso"
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// PUT
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    await pool.query(
      "UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3",
      [nome, email, id]
    );

    res.json({
      mensagem: "Usuário atualizado com sucesso"
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// DELETE
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM usuarios WHERE id = $1",
      [id]
    );

    res.json({
      mensagem: "Usuário removido com sucesso"
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});