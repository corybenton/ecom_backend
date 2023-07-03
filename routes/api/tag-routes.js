const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tag_product' }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server issue' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tag_product' }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag associated with that id'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server issue' });
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch {
    res.status(500).json({ message: 'Internal server issue' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update({
      tag_name: req.body.tag_name},
      {
        where: {
          id: req.params.id,
        }
      }
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server issue' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {id: req.params.id,},
    });
    res.status(200).json(tagData);
  } catch {
    res.status(500).json({ message: 'Internal server issue' });
  }
});
module.exports = router;
