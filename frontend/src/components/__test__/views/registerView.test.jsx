// src/components/__tests__/views/RegisterView.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterView from '../../../views/registerView';


describe('RegisterView', () => {
  test('does not show error message when validation passes with valid inputs', async () => {
    render(
      <BrowserRouter>
        <RegisterView />
      </BrowserRouter>
    );

    // Get the input fields and button
    const firstNameInput = screen.getByPlaceholderText(/First name/i);
    const lastNameInput = screen.getByPlaceholderText(/Last name/i);
    const personNumberInput = screen.getByPlaceholderText(/Person Number/i);
    const emailInput = screen.getByPlaceholderText(/Email Address/i);
    const userNameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const createAccountButton = screen.getByText(/CREATE ACCOUNT/i);

    // Input valid values
    fireEvent.change(firstNameInput, { target: { value: 'John' } }); // Valid first name
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });  // Valid last name
    fireEvent.change(personNumberInput, { target: { value: '950625-1234' } }); // Valid person number
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } }); // Valid email
    fireEvent.change(userNameInput, { target: { value: 'johndoe' } }); // Valid username
    fireEvent.change(passwordInput, { target: { value: 'Password123' } }); // Valid password

    // Submit the form
    fireEvent.click(createAccountButton);

    // Ensure no error messages are shown
    const errorMessages = screen.queryAllByRole('alert'); // Assumes error messages have 'alert' role
    expect(errorMessages.length).toBe(0); // There should be no error messages
  });
});
