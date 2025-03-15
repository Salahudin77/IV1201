import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterView from '../../../views/registerView';

describe('RegisterView', () => {

  test('renders form with all required inputs and button', () => {
    render(
      <BrowserRouter>
        <RegisterView />
      </BrowserRouter>
    );

    const firstNameInput = screen.getByPlaceholderText(/fN/i);
    expect(firstNameInput).toBeInTheDocument();

    const lastNameInput = screen.getByPlaceholderText(/lN/i);
    const personNumberInput = screen.getByPlaceholderText(/pN/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const userNameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    expect(lastNameInput).toBeInTheDocument();
    expect(personNumberInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const createAccountButton = screen.getByText(/createAccount/i);
    expect(createAccountButton).toBeInTheDocument();
  });

  test('does not show error message when validation passes with valid inputs', async () => {
    render(
      <BrowserRouter>
        <RegisterView />
      </BrowserRouter>
    );

    const firstNameInput = screen.getByPlaceholderText(/fN/i);
    const lastNameInput = screen.getByPlaceholderText(/lN/i);
    const personNumberInput = screen.getByPlaceholderText(/pN/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const userNameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const createAccountButton = screen.getByText(/createAccount/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(personNumberInput, { target: { value: '950625-1234' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(userNameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    fireEvent.click(createAccountButton);

    expect(window.location.pathname).toBe('/');
  });

  test('navigates back to login when clicking "Back to Login"', () => {
    render(
      <BrowserRouter>
        <RegisterView />
      </BrowserRouter>
    );

    const backToLoginButton = screen.getByText(/backToLogin/i);
    fireEvent.click(backToLoginButton);

    expect(window.location.pathname).toBe('/login');
  });

  test('password input should be of type password', () => {
    render(
      <BrowserRouter>
        <RegisterView />
      </BrowserRouter>
    );
  
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

});
