// components/ui/ErrorFallback.tsx
import { Feather } from "@expo/vector-icons";
import { reloadAppAsync } from "expo";
import React, { useState } from "react";
import {
   Modal,
   Platform,
   Pressable,
   ScrollView,
   Text,
   View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ErrorFallbackProps = {
   error: Error;
   resetError: () => void;
};

export function ErrorFallback({
   error,
   resetError,
}: ErrorFallbackProps) {
   const insets = useSafeAreaInsets();
   const [isModalVisible, setIsModalVisible] =
      useState(false);

   const handleRestart = async () => {
      try {
         await reloadAppAsync();
      } catch (err) {
         console.error(err);
         resetError();
      }
   };

   const monoFont = Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
   });

   return (
      <View className="flex-1 items-center justify-center bg-background px-6">
         {__DEV__ && (
            <Pressable
               onPress={() => setIsModalVisible(true)}
               accessibilityRole="button"
               className="absolute right-4 h-11 w-11 items-center justify-center rounded-lg bg-card"
               style={{ top: insets.top + 16 }}
            >
               <Feather
                  name="alert-circle"
                  size={20}
                  color="#1C1B1F"
               />
            </Pressable>
         )}

         <View className="w-full max-w-xl items-center">
            <Text className="text-center text-3xl font-bold text-foreground">
               Something went wrong
            </Text>

            <Text className="mt-3 text-center text-base text-muted-foreground">
               Please reload the app to continue.
            </Text>

            <Pressable
               onPress={handleRestart}
               className="mt-8 min-w-[220px] rounded-xl bg-primary py-4"
            >
               <Text className="text-center font-semibold text-primary-foreground">
                  Try Again
               </Text>
            </Pressable>
         </View>

         {__DEV__ && (
            <Modal
               visible={isModalVisible}
               animationType="slide"
               transparent
               onRequestClose={() =>
                  setIsModalVisible(false)
               }
            >
               <View className="flex-1 justify-end bg-black/50">
                  <View className="h-[90%] rounded-t-3xl bg-background">
                     <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
                        <Text className="text-xl font-semibold text-foreground">
                           Error Details
                        </Text>

                        <Pressable
                           onPress={() =>
                              setIsModalVisible(false)
                           }
                        >
                           <Feather
                              name="x"
                              size={24}
                              color="#1C1B1F"
                           />
                        </Pressable>
                     </View>

                     <ScrollView
                        className="flex-1"
                        contentContainerStyle={{
                           padding: 16,
                           paddingBottom:
                              insets.bottom + 20,
                        }}
                     >
                        <View className="rounded-xl bg-card p-4">
                           <Text
                              selectable
                              style={{
                                 fontFamily: monoFont,
                              }}
                              className="text-xs leading-5 text-foreground"
                           >
                              {`Error: ${error.message}

                                    ${error.stack ?? ""}`}
                           </Text>
                        </View>
                     </ScrollView>
                  </View>
               </View>
            </Modal>
         )}
      </View>
   );
}