// src/components/__test__/views/registerView.test.jsx
import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import RegisterView from '../../../views/registerView';

it('renders RegisterView correctly', () => {
  // Render the RegisterView component wrapped in a Router
  render(
    <Router>
      <RegisterView />
    </Router>
  );

  expect(screen.getByPlaceholderText('First name')).toBeTruthy();
  expect(screen.getByPlaceholderText('Last name')).toBeTruthy();
  expect(screen.getByPlaceholderText('Person Number (YYMMDD-NNNN)')).toBeTruthy();
  expect(screen.getByPlaceholderText('Email Address')).toBeTruthy();
  expect(screen.getByPlaceholderText('Username')).toBeTruthy();
  expect(screen.getByPlaceholderText('Password')).toBeTruthy();
  expect(screen.getByText('CREATE ACCOUNT')).toBeTruthy();
});
