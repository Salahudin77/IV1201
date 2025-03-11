import { render, screen, fireEvent } from '@testing-library/react';
import LoginView from '../../../views/loginView';
import { BrowserRouter } from 'react-router-dom';

describe('LoginView', () => {
  test('renders login form with username, password inputs, and submit button', () => {
    render(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/username/i);
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByTestId('login-button');
    expect(loginButton).toBeInTheDocument();
  });

  test('shows error message when validation fails with invalid inputs', async () => {
    render(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(usernameInput, { target: { value: 'abc' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    fireEvent.click(loginButton);

    const errorMessage = screen.getByText(/usernameError/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
