// .src/app/(auth)/forgot-password.tsx
import { Link } from "expo-router";
import { View, Text, TextInput, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ForgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/features/auth/validation/auth.schema";
import { useForgotPassword } from "@/hooks/useForgotPassword";


export default function ForgotPasswordScreen() {
  const { resetPassword, loading } = useForgotPassword();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    resetPassword(data.email);
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">

      <Text className="text-3xl font-bold mb-2">
        Forgot Password
      </Text>

      <Text className="text-gray-500 mb-8">
        Enter your email address to receive a password reset link.
      </Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        className="border rounded-xl p-4 mb-2"
        onChangeText={(text) => setValue("email", text)}
      />

      <Text className="text-red-500 mb-6">
        {errors.email?.message}
      </Text>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-600 rounded-xl p-4"
      >
        <Text className="text-white text-center font-semibold">
          {loading ? "Sending..." : "Send Reset Link"}
        </Text>
      </Pressable>

      <Link
        href="/(auth)/login"
        className="text-center mt-6 text-blue-600"
      >
        Back to Login
      </Link>

    </View>
  );
}