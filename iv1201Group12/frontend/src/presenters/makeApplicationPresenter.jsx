import { MakeApplicationModel } from "../models/makeApplicationModel";

export class MakeApplicationPresenter {
    constructor(updateView) {
        this.model = new MakeApplicationModel();
        this.updateView = updateView;
    }

    handleExperienceChange(jobRole, value) {
        const result = this.model.setExperience(jobRole, value);
        this.updateView({ experienceError: result.success ? null : result.message });
    }
}
