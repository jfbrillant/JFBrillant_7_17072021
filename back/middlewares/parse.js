const parse = (req, res, next) => {
    if (req.body.title) {
        req.body = JSON.parse(req.body.title);
    }
    next();
  }

module.exports = parse;