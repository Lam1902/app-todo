
var Todos = require('../models/todoModel')

function getTodos(res) {
    Todos.find({})
        .then(todos => {
            res.json(todos);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}


module.exports = function (app) {

    app.get("/api/todos", function (req, res) {
        getTodos(res);
    } )

    app.get("/api/todo/:id", function (req, res) {
        Todos.findById(req.params.id)
            .then(todo => {
                if (!todo) {
                    return res.status(404).send("Todo not found");
                }
                res.json(todo);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });
    
    
    // api thêm mới
    app.post("/api/todo", function(req, res) {
        var todo = {
            text: req.body.text,
            isDone: req.body.isDone
        };
    
        Todos.create(todo)
            .then(newTodo => {
                getTodos(res);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });
    
    
// api cập nhật
app.put("/api/todo/", function (req, res) {
    if (!req.body._id) {
        return res.status(400).send("ID is required");
    }

    Todos.findByIdAndUpdate(req.body._id, {
        text: req.body.text,
        isDone: req.body.isDone
    }, { new: true }) // Sử dụng { new: true } để trả về todo đã được cập nhật
    .then(updatedTodo => {
        if (!updatedTodo) {
            return res.status(404).send("Todo not found");
        }
        getTodos(res);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});
    //api xóa
    app.delete("/api/todo/:id", function (req, res) {
        Todos.findByIdAndDelete(req.params.id)
            .then(deletedTodo => {
                if (!deletedTodo) {
                    return res.status(404).send("Không tìm thấy công việc");
                }
                getTodos(res);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });
    
    
}