import { useNavigation } from "@/src/hooks/navigation";
import { CommonHeader, SafeAreaContainer } from "@kukkim/react-native-ui";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet } from "react-native";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function VideoScreen() {
  const { back } = useNavigation();
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Video",
          icon: "back",
          onPress: back,
        }}
      />
      <VideoView
        style={styles.video}
        player={player}
        fullScreenOptions={{ allowsFullscreen: true }}
        allowsPictureInPicture
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  video: {
    width: 350,
    height: 275,
  },
});
