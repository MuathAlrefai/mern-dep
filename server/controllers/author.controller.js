const Author = require("../models/author.model");

module.exports.findAllAuthors = (req, res) => {
  Author.find()
    .then((allDaAuthors) => {
      res.json({ authors: allDaAuthors });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.findOneSingleAuthor = (req, res) => {
  Author.findOne({ _id: req.params.id })
    .then((oneSingleAuthor) => {
      res.json({ author: oneSingleAuthor });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.createNewAuthor = (req, res) => {
  Author.create(req.body)
    .then((newlyCreatedAuthor) => {
      res.json({ author: newlyCreatedAuthor });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.updateExistingAuthor = (req, res) => {
  Author.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedAuthor) => {
      res.json({ author: updatedAuthor });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.deleteAnExistingAuthor = (req, res) => {
  Author.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ result: result });
    })
    .catch((err) => {
      res.json(err);
    });
};
