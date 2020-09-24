import React, { Props } from "react";

/**
 * @example
 * const RoundedButton = sstyled(Button)({
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0
    });
 * @param WrappedComponent 
 */
const sstyledOG = (WrappedComponent: React.ElementType) => {
  return (
    style:
      | React.ComponentProps<Component>["style"]
      | ((
          props: React.ComponentProps<Component> & Props
        ) => React.ComponentProps<Component>["style"])
  ) => {
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
};

export function sstyled<Component extends React.ElementType>(
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
