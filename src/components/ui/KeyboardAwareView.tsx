// src/components/ui/KeyboardAwareView.tsx

import { PropsWithChildren } from "react";
import {
  Platform,
  ScrollView,
  ScrollViewProps,
} from "react-native";

import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";

type Props = PropsWithChildren<
  KeyboardAwareScrollViewProps &
    ScrollViewProps
>;

export function KeyboardAwareView({
  children,
  keyboardShouldPersistTaps = "handled",
  showsVerticalScrollIndicator = false,
  contentContainerStyle,
  ...props
}: Props) {
  if (Platform.OS === "web") {
    return (
      <ScrollView
        keyboardShouldPersistTaps={
          keyboardShouldPersistTaps
        }
        showsVerticalScrollIndicator={
          showsVerticalScrollIndicator
        }
        contentContainerStyle={
          contentContainerStyle
        }
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={
        keyboardShouldPersistTaps
      }
      showsVerticalScrollIndicator={
        showsVerticalScrollIndicator
      }
      contentContainerStyle={
        contentContainerStyle
      }
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}