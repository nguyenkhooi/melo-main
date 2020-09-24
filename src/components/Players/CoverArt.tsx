import { img } from "assets";
// import { sstyled } from "components";
import React from "react";
import { Dimensions, Image } from "react-native";

const ImageSize = Dimensions.get("window").width * 0.82;

/**
 * Cover Art inside PlayerScreen
 * @param props
 */
export const CoverArt = (props) => {
  const imgSrc = props.src ? { uri: props.src } : img.placeholder;
  return <Cover {...props} source={imgSrc} />;
  // return (
  //   <Image
  //     {...props}
  //     source={imgSrc}
  //     style={{ width: ImageSize, height: ImageSize, borderRadius: 5 }}
  //   />
  // );
};

const Cover = sstyledOG(Image)({
  height: ImageSize,
  width: ImageSize,
  borderRadius: 5,
});

// const Cover = sstyled(Image, {
//   height: ImageSize,
//   width: ImageSize,
//   borderRadius: 5
// });

function sstyledOG<Component extends React.ElementType>(
  WrappedComponent: Component
) {
  return (style) => {
    return (props) => {
      return React.createElement(WrappedComponent, {
        ...props,
        style: {
          ...(typeof style === "function" ? style(props) : style),
          ...props.style,
        },
      });
    };
  };
}

function sstyled<Component extends React.ElementType>(
  WrappedComponent: Component,
  style:
    | React.ComponentProps<Component>["style"]
    | ((
        props: React.ComponentProps<Component> & Props
      ) => React.ComponentProps<Component>["style"])
) {
  return (props: React.ComponentProps<Component>) =>
    React.createElement(WrappedComponent, {
      ...props,
      style: {
        ...(typeof style === "function" ? style(props) : style),
        ...props.style,
      },
    });
}
