import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

export type AuthValidationErrors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    validateAuthForm: (params: {
        email: string;
        password: string;
        confirmPassword?: string;
        requireConfirm?: boolean;
    }) => AuthValidationErrors;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    validateAuthForm: () => ({}),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const validateAuthForm: AuthContextType["validateAuthForm"] = ({
        email,
        password,
        confirmPassword,
        requireConfirm,
    }) => {
        const errors: AuthValidationErrors = {};

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirm = confirmPassword?.trim();

        if (!trimmedEmail) {
            errors.email = "Emaili është i detyrueshëm.";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmedEmail)) {
                errors.email = "Shkruani një email të vlefshëm.";
            }
        }

        if (!trimmedPassword) {
            errors.password = "Fjalëkalimi është i detyrueshëm.";
        } else if (trimmedPassword.length < 6) {
            errors.password = "Fjalëkalimi duhet të ketë ≥ 6 karaktere.";
        }

        if (requireConfirm) {
            if (!trimmedConfirm) {
                errors.confirmPassword = "Konfirmimi është i detyrueshëm.";
            } else if (trimmedConfirm !== trimmedPassword) {
                errors.confirmPassword = "Fjalëkalimet nuk përputhen.";
            }
        }

        return errors;
    };

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return sub;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, validateAuthForm }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
