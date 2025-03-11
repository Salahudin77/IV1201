import { vi, test, expect } from 'vitest';
import UserSource from '../../../userSource';



global.fetch = vi.fn();

test('fails to create an account', async () => {
  
  const userData = { username: 'testuser', password: 'testpassword', email: 'test@example.com' };

  
  fetch.mockResolvedValueOnce({
    ok: false,
    text: async () => 'Failed to register', 
  });

  const result = await UserSource.createAccount(userData);


  expect(result.success).toBe(false);
  expect(result.message).toBe('Failed to register');
});
