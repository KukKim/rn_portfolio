import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { CommonText } from "../text";

type CommonSliderProps = {
  labels?: (string | number)[];
};

const CommonSlider = ({ labels = [] }: CommonSliderProps) => {
  const position = useSharedValue(0);
  const startPosition = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startPosition.value = position.value;
    })
    .onUpdate((event) => {
      position.value = startPosition.value + event.translationX;
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));
  const activeTrackStyle = useAnimatedStyle(() => ({
    width: position.value + 15,
  }));

  return (
    <View
      style={{
        borderWidth: 1,
        padding: 20,
        width: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 10,
          backgroundColor: "lightgray",
        }}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              top: 0,
              height: 10,
              backgroundColor: "blue",
              borderRadius: 5,
            },
            activeTrackStyle,
          ]}
        />
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              animatedStyle,
              {
                bottom: 10,
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "blue",
              },
            ]}
          />
        </GestureDetector>
      </View>

      <View
        style={{
          position: "relative",

          height: 24,

          marginTop: 12,
        }}
      >
        {labels.map((label, index) => {
          const percent = labels.length === 1 ? 0 : index / (labels.length - 1);
          return (
            <CommonText
              key={`${label}-${index}`}
              style={{
                position: "absolute",
                left: `${percent * 100}%`,
                transform: [{ translateX: -8 }],
                fontSize: 12,
                color: "#555",
              }}
            >
              {label}
            </CommonText>
          );
        })}
      </View>
    </View>
  );
};

export default CommonSlider;
