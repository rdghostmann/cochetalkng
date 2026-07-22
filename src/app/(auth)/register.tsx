// src/app/(auth)/register.tsx

import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RegisterSchema,
  RegisterFormData,
} from "@/features/auth/validation/auth.schema";

import { useRegister } from "@/hooks/useRegister";

export default function RegisterScreen() {
  const { registerUser, loading } =
    useRegister();

  const {
    control,
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

  return (
    <View className="flex-1 justify-center bg-white px-6">

      <Text className="mb-2 text-3xl font-bold">
        Create Account
      </Text>

      <Text className="mb-8 text-gray-500">
        Join the CocheTalk community.
      </Text>

      <Controller
        control={control}
        name="fullName"
        render={({ field }) => (
          <TextInput
            placeholder="Full Name"
            className="mb-2 rounded-xl border p-4"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Text className="mb-4 text-red-500">
        {errors.fullName?.message}
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-2 rounded-xl border p-4"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Text className="mb-4 text-red-500">
        {errors.email?.message}
      </Text>

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="mb-2 rounded-xl border p-4"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Text className="mb-4 text-red-500">
        {errors.password?.message}
      </Text>

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            className="mb-2 rounded-xl border p-4"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Text className="mb-6 text-red-500">
        {errors.confirmPassword?.message}
      </Text>

      <Pressable
        disabled={loading}
        onPress={handleSubmit(registerUser)}
        className="rounded-xl bg-primary p-4"
      >
        <Text className="text-center font-semibold text-white">
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </Text>
      </Pressable>

      <Link
        href="/(auth)/login"
        className="mt-6 text-center text-primary"
      >
        Already have an account? Login
      </Link>

    </View>
  );
}