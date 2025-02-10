import UserSource from "../userSource";

export class RegisterModel {
    constructor() {
        this.users = [];
      
    }

async register(userData) {
    // Simulate delay with async/await
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    const { email, username } = userData;

    // Check if email or username is already taken
    const existingUser = this.users.find(
        (user) => user.email === email || user.username === username
    );

    if (existingUser) {
        return { success: false, message: "User already exists!" };
    } else {
        this.users.push(userData);

        try {
            const apiResponse = await UserSource.createAccount(userData);
            return { success: true, message: "Registration successful!" };
        } catch (error) {
            return { success: false, message: "API registration failed!" };
        }
    }
}

}
