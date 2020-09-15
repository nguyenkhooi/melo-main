import * as actions from "actions";
import { PRODUCT_SANS } from "assets";
import React from "react";
import { Dimensions, ViewStyle } from "react-native";
import Slider from "react-native-slider";
import TrackPlayer, { ProgressComponent } from "react-native-track-player";
import { connect } from "react-redux";
import styled, { withTheme } from "styled-components/native";
import { contrastTransColor } from "themes";
import { scale } from "utils";

const ScreenWidth = Dimensions.get("window").width;
const SliderWidth = ScreenWidth * 0.82;

class ProgressSlider extends ProgressComponent {
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
    let seekPosition = value * this.msToSec(this.props.currentTrack.duration);
    TrackPlayer.seekTo(seekPosition);
  };

  render() {
    const { currentTrack, theme } = this.props;
    return (
      <Wrapper>
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
        <TimeWrapper>
          <Time>{this.timePassed(currentTrack.duration)}</Time>
          <Time>{this.secToTimeDuration(currentTrack.duration)}</Time>
        </TimeWrapper>
      </Wrapper>
    );
  }
}

function mapStateToProps({ playback }) {
  return { currentTrack: playback.currentTrack };
}

export default connect(mapStateToProps, actions)(withTheme(ProgressSlider));

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
`;

const TimeWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${SliderWidth}px;
  margin-top: -0px;
`;

const Time = styled.Text`
  font-family: ${PRODUCT_SANS};
  font-size: 12px;
  color: ${contrastTransColor(0.75)};
`;

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
