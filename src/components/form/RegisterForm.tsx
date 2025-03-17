import { signIn, signUp } from "@/src/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
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

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(48, { message: "Password must be at most 48 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      await signUp(data.email, data.password);
    } catch (error) {
      if (error instanceof Error)
        setError("confirmPassword", { message: error.message });
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
      <HelperText type="error" visible={!!errors.email}>
        {errors.email?.message}
      </HelperText>

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
      <HelperText type="error" visible={!!errors.password}>
        {errors.email?.message}
      </HelperText>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            placeholder="Confirm your password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="confirmPassword"
      />
      <HelperText type="error" visible={!!errors.confirmPassword}>
        {errors.confirmPassword?.message}
      </HelperText>

      <Button
        disabled={isSubmitting}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        Register
      </Button>
    </View>
  );
}
