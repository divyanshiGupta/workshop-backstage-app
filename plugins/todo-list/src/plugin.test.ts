import { todoListPlugin } from './plugin';

describe('todo-list', () => {
  it('should export plugin', () => {
    expect(todoListPlugin).toBeDefined();
  });
});
