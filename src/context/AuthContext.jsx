import { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, createUser, updateUser as apiUpdateUser } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email, password) => {
        console.log("🔐 Attempting Login for:", email);
        try {
            // Accept any credentials - create a mock user session
            const mockUser = {
                id: Date.now(), // Unique ID based on timestamp
                name: email.split('@')[0] || 'Guest User', // Use email prefix as name
                email: email,
                password: password,
                avatar: '',
                createdAt: new Date().toISOString()
            };

            console.log("✅ Login Successful! User Details:", mockUser);
            setUser(mockUser);
            toast.success(`Welcome, ${mockUser.name}! 🎉`);
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: 'Login failed. Please try again.' };
        }
    };

    const register = async (name, email, password) => {
        console.log("📝 Starting Registration for:", name, email);
        try {
            const response = await getUsers();
            const users = response.data;
            const existingUser = users.find(u => u.email === email);

            if (existingUser) {
                console.warn("⚠️ Registration Failed: User already exists");
                return { success: false, message: 'User already exists' };
            }

            const newUser = {
                name,
                email,
                password,
                avatar: '',
                createdAt: new Date().toISOString()
            };
            const createResponse = await createUser(newUser);
            console.log("✅ Registration Successful! Saved to Database:", createResponse.data);
            setUser(createResponse.data);
            return { success: true };
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, message: 'Registration failed' };
        }
    };

    const updateProfile = async (updatedData) => {
        try {
            if (!user?.id) {
                // If user doesn't have an ID (legacy/mock user), just update local state
                setUser({ ...user, ...updatedData });
                return { success: true };
            }
            const response = await apiUpdateUser(user.id, { ...user, ...updatedData });
            console.log("✅ Profile Updated:", response.data);
            setUser(response.data);
            return { success: true };
        } catch (error) {
            console.error("Update error:", error);
            return { success: false, message: 'Failed to update profile' };
        }
    };

    const logout = () => {
        console.log("👋 Logging out user");
        setUser(null);
        localStorage.removeItem('user');
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
