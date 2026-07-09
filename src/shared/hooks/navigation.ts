import { useRouter } from "expo-router";

export function useNavigation() {
  const router = useRouter();

  const push = (screen: string) => {
    router.push(screen);
  };
  const back = () => {
    router.back();
  };
  return { back, push };
}
