// src/components/__tests__/views/loginView.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginView from '../../../views/loginView';
import { BrowserRouter } from 'react-router-dom';

describe('LoginView', () => {
  // Test 1: Check if the form renders with username, password inputs, and submit button
  test('renders login form with username, password inputs, and submit button', () => {
    render(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>
    );

    // Check if username input is rendered
    const usernameInput = screen.getByPlaceholderText(/username/i);
    expect(usernameInput).toBeInTheDocument();

    // Check if password input is rendered
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    // Check if the login button is rendered using data-testid
    const loginButton = screen.getByTestId('login-button');
    expect(loginButton).toBeInTheDocument();
  });

  // Test 2: Check if form shows error message with invalid inputs
  test('shows error message when validation fails with invalid inputs', async () => {
    render(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>
    );

    // Get the input fields and submit button using data-testid
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByTestId('login-button');

    // Simulate input of invalid data (short username and weak password)
    fireEvent.change(usernameInput, { target: { value: 'abc' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Check for the error message
    const errorMessage = screen.getByText(/usernameError/i);  // Adjust according to the error you expect
    expect(errorMessage).toBeInTheDocument();
  });
});
