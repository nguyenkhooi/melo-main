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
 * @version 0.10.5 
 */
export default function Buttoon(props: P) {
  const {
    icon,
    compact = false,
    appearance,
    onPress,
    progress,
    textStyle,
  } = props;
  const [_loading, setLoading] = React.useState(false);
  function _onPress() {
    setLoading(progress);
    Keyboard.dismiss();
    //@ts-ignore
    onPress && onPress(() => setLoading(false));
  }

  return (
    <Button
      {...props}
      onPress={_onPress}
      style={[
        props.style,
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
        return _loading ? (
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
