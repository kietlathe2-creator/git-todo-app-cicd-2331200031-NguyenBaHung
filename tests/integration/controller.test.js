const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Giả lập View vì chúng ta không kiểm tra giao diện, chỉ kiểm tra tương tác Controller-Model[cite: 59].
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        // Khởi tạo Service và Controller[cite: 60].
        service = TodoService.getInstance ? TodoService.getInstance() : new TodoService();
        service.todos = []; // Reset dữ liệu cho mỗi bài test[cite: 35].
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        // Arrange
        const testText = "Integration Test Task";

        // Act: Gọi phương thức của controller (giả lập hành động người dùng).
        controller.handleAddTodo(testText);

        // Assert: Kiểm tra dữ liệu trong Service đã thay đổi đúng chưa.
        const todos = service.todos;
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(testText);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        // Arrange: Thêm trực tiếp một todo vào service trước.
        service.addTodo("Task to delete");
        const todoId = service.todos[0].id;

        // Act: Gọi phương thức xóa của controller.
        controller.handleRemoveTodo(todoId);

        // Assert: Xác nhận danh sách hiện tại phải trống.
        expect(service.todos.length).toBe(0);
    });
});