import { signIn } from "@/src/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { z } from "zod";

type LoginFormData = {
  email: string;
  password: string;
};

const SignInSchema = z.object({
  email: z.string().min(1, "Required."),
  password: z.string().min(1, "Required."),
});

export default function LoginForm() {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await signIn(data.email, data.password);

      // Give React state time to update before navigation
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 300);
    } catch (error) {
      if (error instanceof Error)
        setError("password", { message: error.message });
    }
  }

  return (
    <View style={{ gap: 12 }}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={{ color: theme.colors.error }}>
          {errors.email.message}
        </Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {errors.password.message}
        </Text>
      )}

      <Button
        disabled={isSubmitting}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        Login
      </Button>
    </View>
  );
}
