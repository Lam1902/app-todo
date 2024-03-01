var app = angular.module("app.todos", ['xeditable']);

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {
    $scope.appName = "Node Note !!";
    $scope.formData = {};
    $scope.todos = [];
    $scope.loading = true;

    // Load data from API
    svTodos.get().then(function(response){
        $scope.todos = response.data;
        $scope.loading = false;
    }).catch(function(error) {
        console.error('Failed to fetch todos:', error);
        $scope.loading = false;
    });
    
    $scope.createTodo = function (event) {
        $scope.loading = true;
        event.preventDefault();
        var todo = { text: $scope.formData.text, isDone: false };

        svTodos.create(todo).then(function(response) {
            $scope.todos = response.data;
            $scope.formData.text = "";
            $scope.loading = false;
        }).catch(function(error) {
            console.error('Failed to create todo:', error);
            $scope.loading = false;
        });
    };

    $scope.updateTodo = function(todoData) {
        $scope.loading = true;
        svTodos.update(todoData).then(function(response) {
            $scope.todos = response.data;
            $scope.loading = false;
        }).catch(function(error) {
            console.error('Failed to update todo:', error);
            $scope.loading = false;
        });  
    };
    
    $scope.deleteTodo = function(todo) {
        $scope.loading = true;
        svTodos.delete(todo._id).then(function(response) {
            $scope.todos = response.data;
            $scope.loading = false;
        }).catch(function(error) {
            console.error('Failed to delete todo:', error);
            $scope.loading = false;
        });
    };
}]);
