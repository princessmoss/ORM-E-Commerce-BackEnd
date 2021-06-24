const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: `No tag with ID ${req.params.id}` });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // {
  //   tag_name: "Basketball",
  // }
  try {
    // create a new tag
    const tagData = await Tag.create(req.body);
    res.status(200).json({ message: `Successfully created` });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a tag's name by its `id` value

    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json({ message: `Successfully updated ID ${req.params.id}` });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete on tag by its `id` value
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: `No tag with ID ${req.params.id}` });
      return;
    }
    res
      .status(200)
      .json({ message: `Successfully deleted ID ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;