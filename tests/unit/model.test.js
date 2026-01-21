const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        // Khởi tạo instance và reset dữ liệu trước mỗi test case
        service = TodoService.getInstance ? TodoService.getInstance() : new TodoService();
        service.todos = []; 
    });

    test('should add a new todo', () => {
        // Arrange
        const text = "Some text";

        // Act
        service.addTodo(text);

        // Assert
        expect(service.todos.length).toBe(1);
        expect(service.todos[0].text).toBe(text);
        expect(service.todos[0].completed).toBe(false);
    });

    test('should toggle the completed state of a todo', () => {
        // Arrange
        service.addTodo("Toggle task");
        const todoId = service.todos[0].id;

        // Act & Assert (Lần 1: Chuyển sang true)
        service.toggleTodoComplete(todoId);
        expect(service.todos[0].completed).toBe(true);

        // Act & Assert (Lần 2: Quay lại false)
        service.toggleTodoComplete(todoId);
        expect(service.todos[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
        // Arrange
        service.addTodo("Task to remove");
        const todoId = service.todos[0].id;

        // Act
        service.removeTodo(todoId);

        // Assert
        expect(service.todos.length).toBe(0);
    });

    test('should not add a todo if text is empty', () => {
        // Act
        service.addTodo(""); 

        // Assert
        expect(service.todos.length).toBe(0); 
    });
});