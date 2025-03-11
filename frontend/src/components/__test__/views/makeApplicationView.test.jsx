import { render, screen, fireEvent } from '@testing-library/react';
import MakeApplicationView from '../../../views/makeApplicationView';
import { BrowserRouter } from 'react-router-dom';

describe('MakeApplicationView', () => {
  // Test 1: Check if the page renders with necessary elements
  test('renders with necessary elements: title, competencies, and availability section', () => {
    render(
      <BrowserRouter>
        <MakeApplicationView />
      </BrowserRouter>
    );

    // Check if the application title is rendered
    const applicationTitle = screen.getByText(/applicationTitle/i);
    expect(applicationTitle).toBeInTheDocument();

    // Check if the competencies section is rendered
    const competenciesSection = screen.getByText(/applicationTextCompetencies/i);
    expect(competenciesSection).toBeInTheDocument();

    // Check if the availability section is rendered
    const availabilitySection = screen.getByText(/applicationTextAvailability/i);
    expect(availabilitySection).toBeInTheDocument();

    // Check if the "Add Availability" button is rendered
    const addAvailabilityButton = screen.getByRole('button', { name: /addAvailabilityButton/i });
    expect(addAvailabilityButton).toBeInTheDocument();
  });

  // Test 2: Check if the competencies checkboxes are interactive
  test('allows the user to select competencies', () => {
    render(
      <BrowserRouter>
        <MakeApplicationView />
      </BrowserRouter>
    );

    // Find the competence checkbox for "competenceTicketSales"
    const competenceCheckbox = screen.getByLabelText(/competenceTicketSales/i);

    // Ensure that the checkbox is initially unchecked
    expect(competenceCheckbox.checked).toBe(false);

    // Click the checkbox to select it
    fireEvent.click(competenceCheckbox);

    // Ensure the checkbox is now checked
    expect(competenceCheckbox.checked).toBe(true);
  });

  // Test 3: Check if the "Add Availability" button functions (no date interaction test for simplicity)
  test('clicking on "Add Availability" button adds an availability period', () => {
    render(
      <BrowserRouter>
        <MakeApplicationView />
      </BrowserRouter>
    );

    // Find the "Add Availability" button
    const addAvailabilityButton = screen.getByRole('button', { name: /addAvailabilityButton/i });

    // Click the "Add Availability" button
    fireEvent.click(addAvailabilityButton);

    // Ensure that a new availability date range is added to the UI (availability section updated)
    const datePickers = screen.getAllByRole('textbox'); // Check for DatePicker inputs
    expect(datePickers.length).toBeGreaterThan(0); // Ensuring that at least one date picker appears
  });
});
