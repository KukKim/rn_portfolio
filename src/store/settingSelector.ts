import type { RootState } from "./index";

export const selectLanguage = (state: RootState) => state.setting.language;
