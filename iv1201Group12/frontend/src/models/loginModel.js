export class LoginModel {
    constructor() {
        this.user = null;
    }

    async login(username, password) {
        // Simulated API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === "admin" && password === "password") {
                    this.user = { username };
                    resolve({ success: true, user: this.user });
                } else {
                    reject({ success: false, message: "Invalid credentials" });
                }
            }, 1000);
        });
    }

    logout() {
        this.user = null;
    }
}
