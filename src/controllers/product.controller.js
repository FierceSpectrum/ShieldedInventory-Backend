// src/controllers/product.controller.js
const { Product, User } = require("@models");

module.exports = {
  async create(req, res) {
    try {
      const user = await User.findByPk(req.body.userId);
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
      const product = await Product.create(req.body);
      res.status(201).json(product.id);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const products = await Product.findAll();
      const filteredProducts = products.map((product) => ({
        id: product.id,
        code: product.code,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        userId: product.userId,
      }));
      res.json(filteredProducts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: "Not found" });

      const filteredProduct = {
        id: product.id,
        code: product.code,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        userId: product.userId,
      };
      res.json(filteredProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: "Not found" });
      await product.update(req.body);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: "Not found" });
      await product.destroy();
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async reduceStock(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });

      const { amount } = req.body;
      if (product.quantity < amount)
        return res.status(400).json({ error: "Not enough stock" });

      product.quantity -= amount;
      await product.save();
      const filteredProduct = {
        id: product.id,
        code: product.code,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        userId: product.userId,
      };
      res.json(filteredProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
