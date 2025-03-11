import { MakeApplicationModel } from "../../../models/makeApplicationModel";

describe("MakeApplicationModel", () => {
    let model;

    beforeEach(() => {
        model = new MakeApplicationModel();
    });

    test("sets experience correctly", () => {
        const result = model.setExperience(1, "2.5");
        expect(result.success).toBe(true);
        expect(result.value).toBe(2.5);
        expect(model.getApplicationData().competencies[0].yearsOfExperience).toBe(2.5);
    });

    test("rejects negative experience values", () => {
        const result = model.setExperience(1, "-1");
        expect(result.success).toBe(false);
        expect(result.message).toBe("Invalid input: Must be a valid non-negative number.");
    });

    test("toggles competence selection", () => {
        model.toggleCompetence(1);
        expect(model.getApplicationData().competencies[0].selected).toBe(true);
        
        model.toggleCompetence(1);
        expect(model.getApplicationData().competencies[0].selected).toBe(false);
    });

    test("adds a new availability period", () => {
        const initialLength = model.getApplicationData().availability.length;
        model.addAvailabilityPeriod();
        expect(model.getApplicationData().availability.length).toBe(initialLength + 1);
    });

    test("sets availability dates correctly", () => {
        model.addAvailabilityPeriod();
        const resultFrom = model.setAvailability(0, 'from', '2025-04-01');
        const resultTo = model.setAvailability(0, 'to', '2025-04-10');

        expect(resultFrom.success).toBe(true);
        expect(resultTo.success).toBe(true);
        expect(model.getApplicationData().availability[0].from).toBe('2025-04-01');
        expect(model.getApplicationData().availability[0].to).toBe('2025-04-10');
    });

    test("rejects invalid availability dates (from > to)", () => {
        model.addAvailabilityPeriod();
        model.setAvailability(0, 'from', '2025-04-15');
        const result = model.setAvailability(0, 'to', '2025-04-10');

        expect(result.success).toBe(false);
        expect(result.message).toBe("'From' date must be before 'To' date.");
    });

    test("retrieves selected competencies correctly", () => {
        model.toggleCompetence(1);
        model.toggleCompetence(3);
        const selected = model.getSelectedCompetencies();

        expect(selected.length).toBe(2);
        expect(selected[0].id).toBe(1);
        expect(selected[1].id).toBe(3);
    });

    test("submits application successfully with valid data", async () => {
        model.toggleCompetence(1);
        model.setExperience(1, "2");
        model.addAvailabilityPeriod();
        model.setAvailability(0, 'from', '2025-04-01');
        model.setAvailability(0, 'to', '2025-04-10');

        const result = await model.submitApplication();
        expect(result.success).toBe(false);
        expect(result.message).toBe("Failed to submit application");
    });

    test("fails to submit when availability is missing", async () => {
        model.toggleCompetence(1);
        model.setExperience(1, "2");

        const result = await model.submitApplication();
        expect(result.success).toBe(false);
        expect(result.message).toBe("Please add at least one availability period.");
    });

    test("fails to submit when availability is incomplete", async () => {
        model.toggleCompetence(1);
        model.setExperience(1, "2");
        model.addAvailabilityPeriod();
        model.setAvailability(0, 'from', '2025-04-01');

        const result = await model.submitApplication();
        expect(result.success).toBe(false);
        expect(result.message).toBe("Please complete all availability periods.");
    });
});
