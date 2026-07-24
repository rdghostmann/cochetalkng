// src/app/(auth)/register.tsx

import { View } from "react-native";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    RegisterSchema,
    RegisterFormData,
} from "@/features/auth/validation/auth.schema";

import { useRegister } from "@/hooks/useRegister";

import {
    AuthHeader,
    AuthInput,
    PasswordInput,
    PrimaryButton,
    AuthFooter,
    AuthDivider,
    SocialLogin,
} from "./components";

export default function RegisterScreen() {

    const { registerUser, loading } = useRegister();

    const {
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),

        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(data: RegisterFormData) {
        registerUser(data);
    }

    return (
        <View className="py-10 flex-1 justify-center bg-background px-6">

            <AuthHeader
                title="Create Account 🚗"
                subtitle="Join Nigeria's trusted automotive community."
            />

            <AuthInput
                label="Full Name"
                placeholder="Enter your full name"
                autoCapitalize="words"
                error={errors.fullName?.message}
                onChangeText={(text) =>
                    setValue("fullName", text, {
                        shouldValidate: true,
                    })
                }
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
                placeholder="Create a password"
                error={errors.password?.message}
                onChangeText={(text) =>
                    setValue("password", text, {
                        shouldValidate: true,
                    })
                }
            />

            <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                onChangeText={(text) =>
                    setValue("confirmPassword", text, {
                        shouldValidate: true,
                    })
                }
            />

            <PrimaryButton
                title="Create Account"
                loading={loading}
                onPress={handleSubmit(onSubmit)}
                className="mt-8"
            />

            <AuthDivider text="or continue with" />

            <SocialLogin loading={loading} />

            <AuthFooter
                text="Already have an account?"
                linkText="Login"
                href="/(auth)/login"
            />

        </View>
    );
}