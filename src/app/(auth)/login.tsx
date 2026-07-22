import { Link } from "expo-router";
import { View, Text, TextInput, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, LoginFormData } from "@/features/auth/validation/auth.schema";
import { useLogin } from "@/hooks/useLogin";

export default function LoginScreen() {
    const { login, loading } = useLogin();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        login(data);
    };

    return (
        <View className="flex-1 bg-white justify-center px-6">

            <Text className="text-3xl font-bold mb-2">
                Welcome Back 👋
            </Text>

            <Text className="text-gray-500 mb-8">
                Sign in to continue.
            </Text>

            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="border rounded-xl p-4 mb-2"
                onChangeText={(text) => setValue("email", text)}
            />

            <Text className="text-red-500 mb-4">
                {errors.email?.message}
            </Text>

            <TextInput
                placeholder="Password"
                secureTextEntry
                className="border rounded-xl p-4 mb-2"
                onChangeText={(text) => setValue("password", text)}
            />

            <Text className="text-red-500 mb-6">
                {errors.password?.message}
            </Text>

            <Pressable
                onPress={handleSubmit(onSubmit)}
                className="bg-blue-600 rounded-xl p-4"
            >
                <Text className="text-center text-white font-semibold">
                    {loading ? "Signing In..." : "Login"}
                </Text>
            </Pressable>

            <Link
                href="/(auth)/forgot-password"
                className="mt-6 text-center text-blue-600"
            >
                Forgot Password?
            </Link>

            <Link
                href="/(auth)/register"
                className="mt-3 text-center text-gray-700"
            >
                Don't have an account? Register
            </Link>

        </View>
    );
}