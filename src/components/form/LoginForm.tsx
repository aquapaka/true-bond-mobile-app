import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: LoginFormData) => console.log(data);

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
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {errors.password.message}
        </Text>
      )}

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
    </View>
  );
}
