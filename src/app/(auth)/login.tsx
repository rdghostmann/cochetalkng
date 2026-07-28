// src/app/(auth)/login.tsx

import { useState } from "react";
import { Link } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginFormData,
  LoginSchema,
} from "@/features/auth/validation/auth.schema";

import { useLogin } from "@/hooks/useLogin";
import { AuthDivider, AuthFooter, AuthHeader, Button, Input, LoginAuthBackgroundBottom, PasswordInput, RememberMe, SocialButtons } from "./components";


export default function LoginScreen() {
  const { login, loading } = useLogin();

  const [rememberMe, setRememberMe] = useState(false);

  const {
    handleSubmit,
    setValue,
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
    <SafeAreaView className="flex-1 bg-background">

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-10"
      >
        {/* Hero */}

        {/* <AuthHeader /> */}

        {/* Authentication Card */}

        <View
          className="
           
            rounded-t-[36px]
            bg-white
            px-6
            pt-8
            pb-10
          "
        >
          {/* Heading */}

          <Text className="text-3xl font-extrabold text-foreground">
            Welcome Back
          </Text>

          <Text className="mt-2 text-base text-muted-foreground">
            Login to continue
          </Text>

          {/* Email */}

          <View className="mt-8">
            <Input
              label="Email Address"
              icon="mail"
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
          </View>

          {/* Password */}

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

          {/* Remember */}

          <View className="mt-2 flex-row items-center justify-between">

            <RememberMe
              checked={rememberMe}
              onChange={() =>
                setRememberMe(!rememberMe)
              }
            />

            <Link
              href="/(auth)/forgot-password"
              className="text-sm font-semibold text-primary"
            >
              Forgot Password?
            </Link>

          </View>

          {/* Login */}

          <Button
            title="Login"
            loading={loading}
            className="mt-8"
            onPress={handleSubmit(onSubmit)}
          />

          {/* Divider */}

          <AuthDivider text="Or continue with" />

          {/* Social */}

          <SocialButtons
            loading={loading}
          />

          {/* Footer */}

          <AuthFooter
            text="Don't have an account?"
            linkText="Register"
            href="/(auth)/register"
          />

          {/* Bottom Decoration */}

          {/* <View className="mt-10 h-24 overflow-hidden">
            <LoginAuthBackgroundBottom />
          </View> */}

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}