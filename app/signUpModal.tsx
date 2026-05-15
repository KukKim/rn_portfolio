// TODO : 모달에서 FlatList가 들어가지 않음(absolute로 잡힘) IOS.

import { CommonButton, CommonInput } from "@/components";
import { requestSignup } from "@/src/features/auth";
import { addErrorLog } from "@/src/features/logging";
import { useAppDispatch } from "@/src/hooks/redux";
import { updateUserInfo } from "@/src/store/userInfoSlice";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const WARNINGTYPE = {
  EMAIL_DUPLICATED: "This email is already in use",
  EMAIL_INVALID: "Invalid email format",
  PASSWORD_LENGTH: "Must be at least 8 characters",
  PASSWORD_UPPERCASE: "Must include at least one uppercase letter",
  PASSWORD_MISMATCH: "Passwords do not match",
  NAME_EMPTY: "Name is required",
};

export default function SignUpModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({
    email: [] as string[],
    name: [] as string[],
    password: [] as string[],
    rePassword: [] as string[],
  });

  const validate = () => {
    const newErrors = {
      email: [] as string[],
      name: [] as string[],
      password: [] as string[],
      rePassword: [] as string[],
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email.push(WARNINGTYPE.EMAIL_INVALID);
    }
    if (email === "test@test.com") {
      newErrors.email.push(WARNINGTYPE.EMAIL_DUPLICATED);
    }
    if (!name.trim()) {
      newErrors.name.push(WARNINGTYPE.NAME_EMPTY);
    }
    if (password.length < 8) {
      newErrors.password.push(WARNINGTYPE.PASSWORD_LENGTH);
    }
    if (!/[A-Z]/.test(password)) {
      newErrors.password.push(WARNINGTYPE.PASSWORD_UPPERCASE);
    }
    if (password !== rePassword) {
      newErrors.rePassword.push(WARNINGTYPE.PASSWORD_MISMATCH);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((arr) => arr.length === 0);
  };

  const handleSignup = () => {
    const isValid = validate();
    if (isValid) {
      // Implement the logic to handle signup
      requestSignup({
        email: email,
        name: name,
        imgUri: "imgUri",
        password: password,
      }).then((response) => {
        if (response?.success) {
          dispatch(updateUserInfo(response.data));
        } else {
          if (response?.status === 409) {
            setErrors((prev) => ({
              ...prev,
              email: [WARNINGTYPE.EMAIL_DUPLICATED],
            }));
          } else if (response?.status === 500) {
            addErrorLog(
              new Error(`Server error during signup: ${response.message}`),
            );
            Alert.alert("Signup Failed", "Something wrong.");
          } else {
            addErrorLog(new Error(`Server not respond`));
            Alert.alert("Server not respond");
          }
        }
      });
    }
  };

  // const renderItem = ({ item }: { item: { uri: string } }) => (
  //   <CommonImage source={{ uri: item.uri }} />
  // );

  // const imgItems = [
  //   {
  //     uri: "https://i.namu.wiki/i/HgFy4enFYB_AldP1OWCePagj9uplVPYfEkaRkdmH_YlZ6H6YAY7CY4SO0oJcpzA4mW8aTw3hg9LCiYCTMqMdCyP1l65OMfE0gXywOBWUWpvxq50cu2qAPsnvX9WkutT57o1A1ZepQQrvPke5XgDVRA.webp",
  //   },
  //   {
  //     uri: "https://i.namu.wiki/i/2cTYsmY5hjBIOoyYgEOe2TU7Yl04ay_zGRlkU5E_AcYp-N8x-tJ-FT7ZE_ov1MDKwVl_e1h7AJ_fFA9kz90s2j2EPw8pEm3qfBqZdOMBe5f65DCCuMjaC4zE9na9o4EooX6aI99VAKJsRIzPH9_9SQ.webp",
  //   },
  //   {
  //     uri: "https://i.namu.wiki/i/a6v6f9BNZa_h4zCvo5HNukt2zC6uT2YYRIBn9blAAcxKYhAasTDdHfPMSkOcmJus6RjNHHj6Tj3pCwXV-jkaO2S0aHARBPwrGhOenQsC9LzSzAETEerFg4CEE86eIY_IXViVezImz9tY-TIN12H-vg.webp",
  //   },
  // ];
  return (
    <View style={styles.container}>
      <Text>Signup Modal screen</Text>
      <CommonInput
        title={"E-mail"}
        value={email}
        onChangeText={setEmail}
        warningText={
          errors.email.length > 0 ? errors.email.join(", ") : undefined
        }
      />
      <CommonInput
        title={"Name"}
        value={name}
        onChangeText={setName}
        warningText={
          errors.name.length > 0 ? errors.name.join(", ") : undefined
        }
      />
      <CommonInput
        title={"Password"}
        value={password}
        onChangeText={setPassword}
        warningText={
          errors.password.length > 0 ? errors.password.join(", ") : undefined
        }
        secureTextEntry
      />
      <CommonInput
        title={"Re-enter Password"}
        value={rePassword}
        onChangeText={setRePassword}
        secureTextEntry
      />
      {/* <CommonListView
        data={imgItems}
        renderItem={renderItem}
        horizontal={true}
      /> */}
      <View style={{ flexDirection: "row" }}>
        <CommonButton
          title="Sign Up"
          disabled={!email || !name || !password || password !== rePassword}
          onPress={handleSignup}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
