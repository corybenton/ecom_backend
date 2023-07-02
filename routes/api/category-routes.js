const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server issue'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category associated with that id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server issue'});
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch {
    res.status(500).json({ message: 'Internal server issue'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update({
      category_name: req.body.category_name},
      {
        where: {
          id: req.params.id,
        }
      }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server issue'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {id: req.params.id,},
    });
    res.status(200).json(categoryData);
  } catch {
    res.status(500).json({ message: 'Internal server issue'});
  }
});

module.exports = router;
