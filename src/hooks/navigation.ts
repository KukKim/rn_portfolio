import { useRouter } from "expo-router";

export function useNavigation() {
  const router = useRouter();

  const back = () => {
    router.back();
  };
  return { back };
}
