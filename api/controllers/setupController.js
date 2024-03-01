var Todos = require("../models/todoModel")

module.exports = function (app) {

    app.get("/api/khoitao", function (req, res) {

        //set up data
        var seedTodos = [
            {
                text: "Hoc node js.",
                isDone: false
            },
            {
                text: "Hoc Argular.",
                isDone: false
            },
            {
                text: "Viet 1 ung dung hoan chinh .",
                isDone: false
            }
        ];

        Todos.create(seedTodos)
        .then(results => {
            console.log("đã thêm dữ liệu");
            res.send(results);
        })
        .catch(err => {
            // Xử lý lỗi nếu có
            console.error("Lỗi khi thêm dữ liệu:", err);
            // Gửi phản hồi lỗi nếu cần
            res.status(500).send("Lỗi khi thêm dữ liệu");
        });
    
       })
    }
    
