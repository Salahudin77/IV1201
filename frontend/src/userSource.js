// No additional imports needed since fetch is built-in
// However, if you need any future imports for other utilities, you can add them here

const UserSource = {
    async createAccount(userData) {
        console.log(userData);
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });
           
    
            if (!response.ok) {
                // Try to extract error message from response
                const text = await response.text();
                console.log('Error response text:', text);  // Log the error response
                throw new Error(text || 'Failed to register');
            }
    
            
         
            
    
            
            return { success: true, message: 'Registration succeded' }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: error.message || 'Registration failed' };
        }
    }
    
    ,
    async login(userData) {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to login');
            }
    
            // Assuming the backend returns the role as plain text
            const role = await response.text(); // Use response.text() to get the plain text
    
            if (role) {
                // Store the role in localStorage
                localStorage.setItem('userRole', role);
            }
            console.log(localStorage.getItem('userRole'))
    
            return { success: true, role }; // You can return the role if needed
        } catch (error) {
            console.error('login error:', error);
            return { success: false, message: 'login failed' };
        }
    },
    
    
    async logout() {
        try {
            // Send GET request to backend
            const response = await fetch('http://localhost:8080/api/logout', {
                method: 'GET',
                credentials: 'include', // Ensures cookies (like session tokens) are sent if needed
            });
    
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to logout');
            }
    
            return { success: true, message: 'Logout successful' };
    
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: 'Logout failed' };
        }
    }
    
    
    
};

export default UserSource;
