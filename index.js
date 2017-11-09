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
        this.todos.forEach(function(todo){
            if(todo.completed === true) {
                completedTodos++;
            }
        });

        // Case 1: If everything's true, make everything false
        if(completedTodos === totalTodos) {
            this.todos.forEach(function(todo) {
                todo.completed = false;
            });
        // Case 2: Otherwise, make everything true
        } else {
            this.todos.forEach(function(todo) {
               todo.completed = true;
            });
        }

        this.todos.forEach(function(todo) {
            // Case 1: If everything's true, make everything false
            if(completedTodos === totalTodos) {
                todo.completed = false;
            // Case 2: Otherwise, make everything true
            } else {
                todo.completed = true;
            }
        });
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
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
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

        console.log(this);
        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement('li'),
                todoTextWithCompletion = '';

            if(todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }

            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            console.log(this.createDeleteButton);
            todoLi.appendChild(this.createDeleteButton());
            todoUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');

        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';

        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event) {
            var elementClicked = event.target;

            if(elementClicked.className === 'deleteButton') {
                handlers.deleteTodo( parseInt(elementClicked.parentNode.id) );
            }
        });
    }
};

view.setUpEventListeners();