const Todo = require('../../../models/Todo');

const getAll = async (req, res) => {

  try {
    const docs = await Todo.find({ "user": "test" });
    res.json({
      "status": "success",
      "data": {
        "todos": docs
      }
    });
  } catch (err) {
    res.status(500).json({
      "status": "error",
      "message": err.message
    });
  }
};

  
  const create = async (req, res) => {
    try {
      let todo = new Todo();
      todo.text = req.body.text;
      todo.user = req.body.user;
      todo.completed = req.body.completed;

      
      const doc = await todo.save();
          res.json({
            "status": "success",
            "data": {
                "todo": doc
              }
          });
    } catch (err) {
      res.status(500).json({
        "status": "error",
        "message": "An error occurred"
      });
    }
  }
    
    module.exports.getAll = getAll;
    module.exports.create = create;

