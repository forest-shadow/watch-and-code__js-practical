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

        for( var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement('li'),
                todo = todoList.todos[i],
                todoTextWithCompletion = '';

            if(todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }

            todoLi.id = i;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todoUl.appendChild(todoLi);
        }
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