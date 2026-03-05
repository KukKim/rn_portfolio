import { CommonHeader } from "@/components";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Video" backable />
      <VideoView
        style={styles.video}
        player={player}
        fullScreenOptions={{ allowsFullscreen: true }}
        allowsPictureInPicture
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: 350,
    height: 275,
  },
});
