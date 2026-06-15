import { ImageSourcePropType } from "react-native";

export const genreImageMap: Record<number, ImageSourcePropType> = {
  4: require("@/assets/images/game/genres/fighting.png"),
  5: require("@/assets/images/game/genres/shooter.png"),
  8: require("@/assets/images/game/genres/platform.png"),
  9: require("@/assets/images/game/genres/puzzle.png"),
  10: require("@/assets/images/game/genres/racing.png"),
  12: require("@/assets/images/game/genres/rpg.png"),
  13: require("@/assets/images/game/genres/simulator.png"),
  14: require("@/assets/images/game/genres/sports.png"),
  15: require("@/assets/images/game/genres/strategy.png"),
  31: require("@/assets/images/game/genres/adventure.png"),
  32: require("@/assets/images/game/genres/indie.png"),
};

export const platformImageMap: Record<number, ImageSourcePropType> = {
  6: require("@/assets/images/game/platforms/pc.png"),
  // 48: require("@/assets/images/game/platforms/ps4.png"),
  // 49: require("@/assets/images/game/platforms/xbox-one.png"),
  // 130: require("@/assets/images/game/platforms/nintendo-switch.png"),
  // 167: require("@/assets/images/game/platforms/ps5.png"),
  // 169: require("@/assets/images/game/platforms/xbox-series.png"),
};

export const defaultGenreImage = require("@/assets/images/game/genres/default.png");
// export const defaultPlatformImage = require("@/assets/images/game/platforms/default.png");
