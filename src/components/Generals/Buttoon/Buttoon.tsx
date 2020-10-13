import { Button, ButtonProps } from "@ui-kitten/components";
import { dIconPrimr, IconPrimr } from "assets";
import { dAccessory } from "components";
// import { IconPrimr, PROPS_IconPrimr } from "assets/";
import R from "ramda";
import * as React from "react";
import { ActivityIndicator, Keyboard } from "react-native";
import { scale } from "utils";

interface P extends ButtonProps {
  icon?: dIconPrimr & {
    /** Is icon on the right? */
    right?: boolean;
  };

  /**
   * Should button be wrapped around its children ("compact")?
   */
  compact?: boolean;

  progress?: boolean;
}

/**
 * This is button component
 * 
 * @example
 * <Buttoon
    progress={true}
    onPress={(xong) => {
      setTimeout(() => {
        xong();
      }, 1000);
    }}
    icon={{ name: "play" }}
  >
    Play
  </Buttoon>
 * 
 * @version 0.10.10
 * @author nguyenkhooi
 */
export class Buttoon extends React.PureComponent<P> {
  constructor(props: P) {
    super(props);
    this.state = {
      _loading: false,
    };
    this._onPress = this._onPress.bind(this);
  }
  _onPress() {
    this.setState({ _loading: this.props.progress });
    Keyboard.dismiss();
    //@ts-ignore
    this.props.onPress &&
      this.props.onPress(() => this.setState({ _loading: false }));
  }

  static Fab(p: P) {
    return Fab(p);
  }
  render() {
    const {
      icon,
      compact = false,
      appearance,
      onPress,
      progress,
      style,
    } = this.props;

    return (
      <Button
        {...this.props}
        onPress={this._onPress}
        style={[
          style,
          !!compact && { alignSelf: "center" },
          appearance == "icon" && {
            borderRadius: scale(100),
            borderWidth: 0,
            width: scale(20),
            height: scale(20),
            margin: scale(3),
          },
        ]}
        accessoryLeft={(props: dAccessory) => {
          return this.state._loading ? (
            <ActivityIndicator color={props.style.tintColor} />
          ) : (
            !R.isNil(icon) && R.isNil(icon.right) && (
              <IconPrimr
                preset={"default"}
                name={`arrow_left`}
                size={props.style.width * 0.8}
                color={props.style.tintColor}
                {...icon}
              />
            )
          );
        }}
        accessoryRight={(props: dAccessory) => {
          return (
            !R.isNil(icon) &&
            !R.isNil(icon.right) && (
              <IconPrimr
                preset={`safe`}
                name={`arrow_left`}
                size={props.style.width * 0.8}
                color={props.style.tintColor}
                {...icon}
              />
            )
          );
        }}
      />
    );
  }
}

function Fab(props: P) {
  return (
    <Buttoon
      style={{ padding: 30, borderRadius: 100 }}
      compact
      size="giant"
      progress={true}
      icon={{ name: "placeholder" }}
      {...props}
    />
  );
}
