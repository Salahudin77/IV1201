import { MakeApplicationModel } from "../../../models/makeApplicationModel";

describe('MakeApplicationModel', () => {
  let model;

  beforeEach(() => {
    model = new MakeApplicationModel();
  });

  test('sets experience correctly', () => {
    const result = model.setExperience(1, "3.5");
    expect(result.success).toBe(true);
    expect(result.value).toBe(3.5);
    expect(model.getApplicationData().competencies[0].yearsOfExperience).toBe(3.5);
  });

  test('rejects invalid experience values', () => {
    const result = model.setExperience(1, "-2");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid input: Must be a valid non-negative number.");
  });

  test('toggles competency selection', () => {
    model.toggleCompetence(1);
    expect(model.getApplicationData().competencies[0].selected).toBe(true);

    model.toggleCompetence(1);
    expect(model.getApplicationData().competencies[0].selected).toBe(false);
  });

  test('adds a new availability period', () => {
    const initialLength = model.getApplicationData().availability.length;
    model.addAvailabilityPeriod();
    const newLength = model.getApplicationData().availability.length;
    expect(newLength).toBe(initialLength + 1);
  });

  test('sets availability correctly', () => {
    const resultFrom = model.setAvailability(0, 'from', '2025-03-01');
    const resultTo = model.setAvailability(0, 'to', '2025-03-10');
    expect(resultFrom.success).toBe(true);
    expect(resultTo.success).toBe(true);
    expect(model.getApplicationData().availability[0].from).toBe('2025-03-01');
    expect(model.getApplicationData().availability[0].to).toBe('2025-03-10');
  });

  test('rejects invalid availability dates (from > to)', () => {
    model.addAvailabilityPeriod();
    const result = model.setAvailability(0, 'from', '2025-03-15');
    const resultInvalid = model.setAvailability(0, 'to', '2025-03-10');
    expect(result.success).toBe(true);
    expect(resultInvalid.success).toBe(false);
    expect(resultInvalid.message).toBe("'From' date must be before 'To' date.");
  });

  test('gets selected competencies', () => {
    model.toggleCompetence(1);
    model.toggleCompetence(2);
    const selectedCompetencies = model.getSelectedCompetencies();
    expect(selectedCompetencies.length).toBe(2);
    expect(selectedCompetencies[0].id).toBe(1);
    expect(selectedCompetencies[1].id).toBe(2);
  });

  test('fails to submit application when no availability is added', async () => {
    model.toggleCompetence(1);
    model.setExperience(1, "3");

    const result = await model.submitApplication();
    expect(result.success).toBe(false);
    expect(result.message).toBe("Please add at least one availability period.");
  });
});
