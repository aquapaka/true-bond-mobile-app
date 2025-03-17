import { signIn } from "@/src/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { z } from "zod";

type LoginFormData = {
  email: string;
  password: string;
};

const SignInSchema = z.object({
  email: z.string().min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
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
            label="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      <HelperText type="error" visible={!!errors.email}>
        {errors.email?.message}
      </HelperText>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      <HelperText type="error" visible={!!errors.password}>
        {errors.password?.message}
      </HelperText>

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
