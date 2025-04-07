// src/controllers/product.controller.js
const { Product } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: "Not found" });
      res.json(product);
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
      const { amount } = req.body;
      if (product.quantity < amount)
        return res.status(400).json({ error: "Not enough stock" });

      product.quantity -= amount;
      await product.save();
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
