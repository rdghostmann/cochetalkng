// src/app/(auth)/register.tsx

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RegisterSchema,
  RegisterFormData,
} from "@/features/auth/validation/auth.schema";

import { useRegister } from "@/hooks/useRegister";
import { AuthDivider, AuthFooter, AuthHeader, Button, Input, PasswordInput, SocialButtons } from "./components";
import { PasswordRequirements } from "./components/PasswordRequirements";
import { RegisterAuthBackgroundBottom } from "./components/RegisterAuthBackgroundBottom";



export default function RegisterScreen() {
  const { registerUser, loading } = useRegister();

  const {
    watch,
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

  const password = watch("password");

  function onSubmit(data: RegisterFormData) {
    registerUser(data);
  }

  return (
    <SafeAreaView className="flex-1 bg-background">

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-10"
      >
        {/* Hero */}

        <AuthHeader
          title="Create Account"
          subtitle="Join the CocheTalkNG community today"
        />

        {/* Card */}

        <View
          className="
            -mt-10
            rounded-t-[36px]
            bg-white
            px-6
            pt-8
            pb-10
          "
        >
          <Text className="text-center text-3xl font-extrabold text-foreground">
            Create Account
          </Text>

          <Text className="mt-2 text-center text-base text-muted-foreground">
            Join the CocheTalkNG community today
          </Text>

          <View className="mt-8">

            <Input
              label="Full Name"
              icon="user"
              placeholder="Full Name"
              autoCapitalize="words"
              error={errors.fullName?.message}
              onChangeText={(text) =>
                setValue("fullName", text, {
                  shouldValidate: true,
                })
              }
            />

            <Input
              label="Email Address"
              icon="mail"
              placeholder="Email Address"
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
              placeholder="Password"
              error={errors.password?.message}
              onChangeText={(text) =>
                setValue("password", text, {
                  shouldValidate: true,
                })
              }
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm Password"
              error={errors.confirmPassword?.message}
              onChangeText={(text) =>
                setValue("confirmPassword", text, {
                  shouldValidate: true,
                })
              }
            />

            <PasswordRequirements
              password={password}
            />

            <Button
              title="Create Account"
              loading={loading}
              className="mt-4"
              onPress={handleSubmit(onSubmit)}
            />

            <AuthDivider
              text="or continue with"
            />

            <SocialButtons
              loading={loading}
            />

            <AuthFooter
              text="Already have an account?"
              linkText="Log in"
              href="/(auth)/login"
            />

          </View>

          <View className="mt-10 h-28 overflow-hidden">
            <RegisterAuthBackgroundBottom />
          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}