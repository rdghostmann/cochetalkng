// src/app/(auth)/login.tsx

import { Link } from "expo-router";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    LoginFormData,
    LoginSchema,
} from "@/features/auth/validation/auth.schema";

import { useLogin } from "@/hooks/useLogin";
import {
    AuthHeader, AuthInput,
    PasswordInput,
    PrimaryButton,
    AuthFooter,
    AuthDivider,
    SocialLogin,
} from "./components";



export default function LoginScreen() {
    const { login, loading } = useLogin();

    const {
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: LoginFormData) {
        login(data);
    }


    return (
        <View className="flex-1 justify-center bg-background px-6">

            <AuthHeader
                title="Welcome Back 👋"
                subtitle="Sign in to continue your automotive journey."
            />

            <AuthInput
                label="Email Address"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email?.message}
                onChangeText={(text) =>
                    setValue("email", text, {
                        shouldValidate: true,
                    })
                }
            />

            <PasswordInput
                label="Password"
                placeholder="Enter your password"
                error={errors.password?.message}
                onChangeText={(text) =>
                    setValue("password", text, {
                        shouldValidate: true,
                    })
                }
            />

            <Link
                href="/(auth)/forgot-password"
                className="mt-3 self-end text-primary font-medium"
            >
                Forgot Password?
            </Link>

            <PrimaryButton
                title="Sign In"
                loading={loading}
                onPress={handleSubmit(onSubmit)}
                className="mt-8"
            />

            <AuthDivider text="or continue with" />

            <SocialLogin
                loading={loading}
            />
            
            <AuthFooter
                text="Don't have an account?"
                linkText="Register"
                href="/(auth)/register"
            />

        </View>
    );
}