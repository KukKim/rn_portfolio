import { registerPushToken, requestCheckToken } from "@/src/features/auth";
import { addErrorLog } from "@/src/features/logging";
import { registerForPushNotificationsAsync } from "@/src/features/notification";
import { useAppDispatch, useAppSelector } from "@/src/shared/hooks/redux";
import { deleteUserInfo } from "@/src/store/userInfoSlice";
import { getLocales } from "expo-localization";
import { useNavigationContainerRef, useRouter } from "expo-router";
import { I18n } from "i18n-js";
import { useEffect } from "react";
import { View } from "react-native";
import translation from "./translation.json";

export default function Index() {
  const i18n = new I18n(translation);
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo);

  // TODO: protectedRoute로 구현방식 변경하기
  useEffect(() => {
    const unsubscribe = navigationRef.addListener("state", () => {
      if (!userInfo?.token) {
        router.push("/loginModal");
      }
      unsubscribe();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userInfo?.token) {
      requestCheckToken(userInfo.token)
        .then((res) => {
          if (!res?.success) {
            router.push("/loginModal");
            dispatch(deleteUserInfo());
          } else {
            registerForPushNotificationsAsync()
              .then((token) => {
                if (userInfo?.token && token) {
                  registerPushToken(userInfo.token, token, userInfo.id);
                }
              })
              .catch((error: any) => {
                addErrorLog(error);
              });
            router.replace("/main");
          }
        })
        .catch((error) => {
          addErrorLog(error);
          router.push("/loginModal");
          dispatch(deleteUserInfo());
        });
    }
  }, [userInfo?.token]);

  i18n.locale = getLocales().at(0)?.languageCode ?? "en";
  return <View></View>;
}
