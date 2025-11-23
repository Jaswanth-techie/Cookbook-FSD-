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
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();
        console.log("🔐 Attempting Login for:", cleanEmail);

        try {
            const response = await getUsers();
            const users = response.data;

            const foundUser = users.find(u =>
                u.email.toLowerCase() === cleanEmail &&
                u.password === cleanPassword
            );

            if (foundUser) {
                console.log("✅ Login Successful! User Details:", foundUser);
                setUser(foundUser);
                toast.success(`Welcome back, ${foundUser.name}! 🎉`);
                return { success: true };
            } else {
                console.warn("❌ Login Failed: Invalid credentials");
                // Debug helper
                const emailExists = users.some(u => u.email.toLowerCase() === cleanEmail);
                if (emailExists) {
                    console.log("⚠️ Email found, but password did not match.");
                } else {
                    console.log("⚠️ Email not found in database.");
                }
                return { success: false, message: 'Invalid email or password' };
            }
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
