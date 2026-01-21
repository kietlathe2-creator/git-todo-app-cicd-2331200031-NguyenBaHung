const { _electron: electron } = require('playwright');
const { test, expect } = require('@playwright/test');

test('should complete the core user workflow', async () => {
    // 1. Khởi chạy ứng dụng [cite: 71]
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();
    
    // Đợi cửa sổ tải xong hoàn toàn
    await window.waitForLoadState('domcontentloaded');

    // 2. Tìm ô input và nhập task mới 
    const todoText = 'Học Playwright E2E';
    await window.waitForSelector('#todo-input'); // Đợi ô input xuất hiện
    await window.fill('#todo-input', todoText);

    // 3. Click nút "Add" 
    await window.waitForSelector('#add-btn'); // Đợi nút Add xuất hiện
    await window.click('#add-btn');

    // 4. Xác nhận task mới xuất hiện 
    const todoItem = window.locator('.todo-item').last();
    await expect(todoItem).toBeVisible();
    await expect(todoItem).toContainText(todoText);

    // 5. Click checkbox để hoàn thành [cite: 75]
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.check();

    // 6. Xác nhận style 'completed' [cite: 76]
    await expect(todoItem).toHaveClass(/completed/);

    // 7. Click nút "Delete" [cite: 77]
    const deleteBtn = todoItem.locator('.delete-btn');
    await deleteBtn.click();

    // 8. Xác nhận đã xóa thành công [cite: 78]
    const count = await window.locator('.todo-item').count();
    expect(count).toBe(0);

    // Đóng ứng dụng
    await electronApp.close();
});