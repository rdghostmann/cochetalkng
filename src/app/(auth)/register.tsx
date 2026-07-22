import { Link } from "expo-router";
import { View, Text, TextInput, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RegisterSchema,
  RegisterFormData,
} from "@/features/auth/validation/auth.schema";
import { useRegister } from "@/hooks/useRegister";


export default function RegisterScreen() {
  const { registerUser, loading } = useRegister();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">

      <Text className="text-3xl font-bold mb-2">
        Create Account
      </Text>

      <Text className="text-gray-500 mb-8">
        Join the CocheTalk community.
      </Text>

      <TextInput
        placeholder="Full Name"
        className="border rounded-xl p-4 mb-2"
        onChangeText={(text) => setValue("fullName", text)}
      />

      <Text className="text-red-500 mb-4">
        {errors.fullName?.message}
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

      <Text className="text-red-500 mb-4">
        {errors.password?.message}
      </Text>

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        className="border rounded-xl p-4 mb-2"
        onChangeText={(text) => setValue("confirmPassword", text)}
      />

      <Text className="text-red-500 mb-6">
        {errors.confirmPassword?.message}
      </Text>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-600 rounded-xl p-4"
      >
        <Text className="text-white text-center font-semibold">
          {loading ? "Creating Account..." : "Register"}
        </Text>
      </Pressable>

      <Link
        href="/(auth)/login"
        className="text-center mt-6 text-blue-600"
      >
        Already have an account? Login
      </Link>

    </View>
  );
}