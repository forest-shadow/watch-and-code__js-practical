var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];

        todo.completed = !todo.completed;
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    toggleAll: function () {
        var totalTodos = this.todos.length,
            completedTodos = 0;

        // Get number of completed todos
        for(var i = 0; i < totalTodos; i++) {
            if(this.todos[i].completed === true) {
                completedTodos++;
            }
        }

        // Case 1: If everything's true, make everything false
        if(completedTodos === totalTodos) {
            for( var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = false;
            }
        // Case 2: Otherwise, make everything true
        } else {
            for(var i = 0; i < totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
    }
};

var handlers = {
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');

        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoTextInput = document.getElementById('changeTodoTextInput'),
            changeTodoPositionInput = document.getElementById('changeTodoPositionInput');

        todoList.changeTodo(changeTodoPositionInput.value, changeTodoTextInput.value );
        changeTodoTextInput.value = '';
        changeTodoPositionInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function () {
        var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');

        todoList.deleteTodo(deleteTodoPositionInput.value);
        deleteTodoPositionInput.value = '';
        view.displayTodos();
    },
    toggleCompleted: function () {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');

        todoList.toggleCompleted(toggleCompletedPositionInput.value);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function() {
        var todoUl = document.querySelector('ul');

        todoUl.innerHTML = '';

        for( var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement('li'),
                todo = todoList.todos[i],
                todoTextWithCompletion = '';

            if(todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }

            todoLi.textContent = todoTextWithCompletion;
            todoUl.appendChild(todoLi);
        }
    }
};