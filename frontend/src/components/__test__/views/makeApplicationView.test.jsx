import { render, screen, fireEvent } from '@testing-library/react';
import MakeApplicationView from '../../../views/makeApplicationView';
import { BrowserRouter } from 'react-router-dom';

describe('MakeApplicationView', () => {
  test('renders with necessary elements: title, competencies, and availability section', () => {
    render(
      <BrowserRouter>
        <MakeApplicationView />
      </BrowserRouter>
    );

    const applicationTitle = screen.getByText(/applicationTitle/i);
    expect(applicationTitle).toBeInTheDocument();

    const competenciesSection = screen.getByText(/applicationTextCompetencies/i);
    expect(competenciesSection).toBeInTheDocument();

    const availabilitySection = screen.getByText(/applicationTextAvailability/i);
    expect(availabilitySection).toBeInTheDocument();

    const addAvailabilityButton = screen.getByRole('button', { name: /addAvailabilityButton/i });
    expect(addAvailabilityButton).toBeInTheDocument();
  });

  test('allows the user to select competencies', () => {
    render(
      <BrowserRouter>
        <MakeApplicationView />
      </BrowserRouter>
    );

    const competenceCheckbox = screen.getByLabelText(/competenceTicketSales/i);

    expect(competenceCheckbox.checked).toBe(false);

    fireEvent.click(competenceCheckbox);

    expect(competenceCheckbox.checked).toBe(true);
  });

  test('clicking on "Add Availability" button adds an availability period', () => {
    render(
      <BrowserRouter>
        <MakeApplicationView />
      </BrowserRouter>
    );

    const addAvailabilityButton = screen.getByRole('button', { name: /addAvailabilityButton/i });

    fireEvent.click(addAvailabilityButton);

    const datePickers = screen.getAllByRole('textbox');
    expect(datePickers.length).toBeGreaterThan(0);
  });
});
