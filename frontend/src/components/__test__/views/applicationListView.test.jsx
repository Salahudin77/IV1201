// src/components/__tests__/views/applicationListView.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ApplicationListView from '../../../views/applicationListView';
import { BrowserRouter } from 'react-router-dom';

describe('ApplicationListView', () => {
  // Test 1: Check if the page renders with necessary elements
  test('renders with necessary elements: back button, fetch button, and heading', () => {
    render(
      <BrowserRouter>
        <ApplicationListView />
      </BrowserRouter>
    );

    // Check if the "Back to Previous Screen" button is rendered
    const backButton = screen.getByRole('button', { name: /backToPreviousScreen/i });
    expect(backButton).toBeInTheDocument();

    // Check if the "Fetch Applications" button is rendered
    const fetchButton = screen.getByRole('button', { name: /fetchApplications/i });
    expect(fetchButton).toBeInTheDocument();

    // Check if the applications heading is rendered
    const heading = screen.getByRole('heading', { name: /applicationsHeading/i });
    expect(heading).toBeInTheDocument();
  });

  // Test 2: Check if the loading indicator appears when fetching applications
  test('shows loading indicator when applications are being fetched', () => {
    render(
      <BrowserRouter>
        <ApplicationListView />
      </BrowserRouter>
    );

    // Click the "Fetch Applications" button
    const fetchButton = screen.getByRole('button', { name: /fetchApplications/i });
    fireEvent.click(fetchButton);

    // Check if the loading indicator is displayed
    const loadingIndicator = screen.getByText(/loadingApplications/i);
    expect(loadingIndicator).toBeInTheDocument();
  });

  // Test 3: Check if the error message is displayed if there is an error
  test('shows loading indicator when Fetch Applications button is clicked', () => {
    render(
      <BrowserRouter>
        <ApplicationListView />
      </BrowserRouter>
    );

    // Find the "Fetch Applications" button
    const fetchButton = screen.getByRole('button', { name: /fetchApplications/i });

    // Click the "Fetch Applications" button
    fireEvent.click(fetchButton);

    // Check if the loading indicator is displayed
    const loadingIndicator = screen.getByText(/loadingApplications/i);
    expect(loadingIndicator).toBeInTheDocument();
  });



  // Test 5: Check if the empty message is displayed when there are no applications
  test('displays no applications message when there are no applications', () => {
    render(
      <BrowserRouter>
        <ApplicationListView />
      </BrowserRouter>
    );

    // Check if the empty message is displayed when no applications exist
    const emptyMessage = screen.getByText(/noApplicationsFound/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
