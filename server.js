require("dotenv").config();

const express = require("express")
const jsonwebtoken = require("jsonwebtoken");
const db = require("./helper/relation");
const app = express()

const { Product, User, ImageUser, Image } = db;

const port = process.env.PORT || 3000;

app.post("/user", async (req, res) => {
  await User.create(req.body);
  res.json({ message: "created" });
});

app.post("/product", async (req, res) => {
  await Product.create(req.body);
  res.json({ message: "created" });
});

app.get("/get", async (req, res) => {
  const data = await User.findAll({
      attributes: ["id", "username"],
      paranoid: false,
      benchmark: true,
      order: [["id", "ASC"]],
    // offset: JSON.parse(req.query.page * req.query.size), // <<<< ini page
    // limit: JSON.parse(req.query.size), // <<<< jumlah isi dari page
    // include: [{ model: Product }],
  });
  res.status(200).json({ data });
});

app.delete("/delete", async (req, res) => {
    const data = await User.destroy({where: {id: 1}})
    res.json({ data });
  });

app.get("/image", async (req, res) => {
  const data = await Image.findAll({
    include: [{ model: User, through: {} }],
  });
  res.json({ data });
});

app.post("/image", async (req, res) => {
  const data = await Image.create(req.body);
  req.body.imageId = data.dataValues.id;
  await ImageUser.create(req.body);
  res.json(data);
});


app.get("/logout", async (req, res) => {
  res.status(200).json({ message: "sudah logout" });
});

module.exports = app