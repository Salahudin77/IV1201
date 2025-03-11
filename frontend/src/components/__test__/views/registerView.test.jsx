// src/components/__tests__/views/RegisterView.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterView from '../../../views/registerView';

describe('RegisterView', () => {

  // Test 1: Check if the form renders with all required inputs and the button
  test('renders form with all required inputs and button', () => {
    render(
      <BrowserRouter>
        <RegisterView />
      </BrowserRouter>
    );

    // Check if the form exists by checking for one of the input fields
    const firstNameInput = screen.getByPlaceholderText(/fN/i);
    expect(firstNameInput).toBeInTheDocument();

    // Check if all input fields are rendered
    const lastNameInput = screen.getByPlaceholderText(/lN/i);
    const personNumberInput = screen.getByPlaceholderText(/pN/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const userNameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    // Ensure each input is rendered
    expect(lastNameInput).toBeInTheDocument();
    expect(personNumberInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Check if the "createAccount" button exists
    const createAccountButton = screen.getByText(/createAccount/i);
    expect(createAccountButton).toBeInTheDocument();
  });

  // Test 2: Check if the form doesn't show error messages with valid inputs
  test('does not show error message when validation passes with valid inputs', async () => {
    render(
      <BrowserRouter>
        <RegisterView />
      </BrowserRouter>
    );

    // Get the input fields and button
    const firstNameInput = screen.getByPlaceholderText(/fN/i);
    const lastNameInput = screen.getByPlaceholderText(/lN/i);
    const personNumberInput = screen.getByPlaceholderText(/pN/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const userNameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const createAccountButton = screen.getByText(/createAccount/i);

    // Input valid values into the form fields
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(personNumberInput, { target: { value: '950625-1234' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(userNameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    // Submit the form
    fireEvent.click(createAccountButton);

    // Ensure no error messages are shown after form submission
    const errorMessages = screen.queryAllByRole('alert');
    expect(errorMessages.length).toBe(0); // No error messages should be shown
  });
  test('navigates back to login when clicking "Back to Login"', () => {
    render(
      <BrowserRouter>
        <RegisterView />
      </BrowserRouter>
    );

    const backToLoginButton = screen.getByText(/backToLogin/i);
    fireEvent.click(backToLoginButton);

    // Expect window location to change
    expect(window.location.pathname).toBe('/login');
  });
  test('password input should be of type password', () => {
    render(
      <BrowserRouter>
        <RegisterView />
      </BrowserRouter>
    );
  
    // Get the password input field
    const passwordInput = screen.getByPlaceholderText(/password/i);
  
    // Ensure the password input is correctly set to "password" type
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  


 
});
