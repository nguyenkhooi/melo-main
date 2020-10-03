import { PRODUCT_SANS } from "assets";
import { sstyled } from "components";
import { connector, dRedux } from "engines";
import React from "react";
import { Dimensions, ViewStyle, View, Text } from "react-native";
import Slider from "react-native-slider";
import TrackPlayer, { ProgressComponent } from "react-native-track-player";
import { withTheme } from "styled-components/native";
import { contrastTransColor } from "themes";
import { dSCR, scale } from "utils";

const ScreenWidth = Dimensions.get("window").width;
const SliderWidth = ScreenWidth * 0.82;

interface P extends dRedux, dSCR, ProgressComponent {}

class S_ProgressSlider extends ProgressComponent<P> {
  msToSec(ms) {
    return parseInt(ms / 1000, 10);
  }

  secToTime(secs) {
    if (secs < 0) {
      return "0:00";
    }
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs % 60);
    return seconds <= 9 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  timePassed(duration) {
    return this.secToTime(this.getProgress() * this.msToSec(duration));
  }

  secToTimeDuration(duration) {
    let timeInSeconds = this.msToSec(duration);
    return this.secToTime(timeInSeconds);
  }

  seekTo = (value) => {
    let seekPosition =
      value * this.msToSec(this.props.playback.currentTrack.duration);
    TrackPlayer.seekTo(seekPosition);
  };

  render() {
    const {
      playback: { currentTrack },
      theme,
    } = this.props;
    return (
      <CtnrSlider {...this.props}>
        <Slider
          value={this.getProgress()}
          style={styles.sliderStyle}
          minimumTrackTintColor={theme.contrast}
          maximumTrackTintColor={`${theme.contrastTrans}0.3)`}
          thumbTouchSize={styles.thumbSize}
          trackStyle={styles.barStyle}
          thumbStyle={{ ...styles.thumbStyle, backgroundColor: theme.contrast }}
          onValueChange={this.seekTo}
        />
        <CtnrTime {...this.props}>
          <TxtTime {...this.props}>
            {this.timePassed(currentTrack.duration)}
          </TxtTime>
          <TxtTime {...this.props}>
            {this.secToTimeDuration(currentTrack.duration)}
          </TxtTime>
        </CtnrTime>
      </CtnrSlider>
    );
  }
}

export default connector(withTheme(S_ProgressSlider));

const CtnrSlider = sstyled(View)({
  flexDirection: "column",
  alignItems: "center",
});

const CtnrTime = sstyled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: SliderWidth,
});

const TxtTime = sstyled(Text)((props) => ({
  fontFamily: PRODUCT_SANS,
  fontSize: 12,
  color: contrastTransColor(0.75)(props),
}));

const styles = {
  sliderStyle: {
    width: SliderWidth,
  },
  thumbSize: {
    width: ScreenWidth * 1.5,
    height: 100,
  },
  barStyle: {
    height: 3,
  },
  thumbStyle: {
    height: scale(20),
    width: scale(20),
  } as ViewStyle,
};
