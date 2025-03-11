import { render, screen, fireEvent } from '@testing-library/react';
import ApplicationListView from '../../../views/applicationListView';
import { BrowserRouter } from 'react-router-dom';

describe('ApplicationListView', () => {
  test('renders with necessary elements: back button, fetch button, and heading', () => {
    render(
      <BrowserRouter>
        <ApplicationListView />
      </BrowserRouter>
    );

    const backButton = screen.getByRole('button', { name: /backToPreviousScreen/i });
    expect(backButton).toBeInTheDocument();

    const fetchButton = screen.getByRole('button', { name: /fetchApplications/i });
    expect(fetchButton).toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /applicationsHeading/i });
    expect(heading).toBeInTheDocument();
  });

  test('shows loading indicator when applications are being fetched', () => {
    render(
      <BrowserRouter>
        <ApplicationListView />
      </BrowserRouter>
    );

    const fetchButton = screen.getByRole('button', { name: /fetchApplications/i });
    fireEvent.click(fetchButton);

    const loadingIndicator = screen.getByText(/loadingApplications/i);
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('shows loading indicator when Fetch Applications button is clicked', () => {
    render(
      <BrowserRouter>
        <ApplicationListView />
      </BrowserRouter>
    );

    const fetchButton = screen.getByRole('button', { name: /fetchApplications/i });
    fireEvent.click(fetchButton);

    const loadingIndicator = screen.getByText(/loadingApplications/i);
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('displays no applications message when there are no applications', () => {
    render(
      <BrowserRouter>
        <ApplicationListView />
      </BrowserRouter>
    );

    const emptyMessage = screen.getByText(/noApplicationsFound/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
