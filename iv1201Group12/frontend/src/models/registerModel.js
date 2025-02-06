export class RegisterModel {
    constructor() {
        this.users = [];
    }

    async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const { email, username } = userData;

                // Check if email or username is already taken
                const existingUser = this.users.find(
                    (user) => user.email === email || user.username === username
                );

                if (existingUser) {
                    reject({ success: false, message: "User already exists!" });
                } else {
                    this.users.push(userData);
                    resolve({ success: true, message: "Registration successful!" });
                }
            }, 1000);
        });
    }
}
