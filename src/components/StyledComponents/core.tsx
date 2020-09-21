import React from "react";

/**
 * @example
 * const RoundedButton = sstyled(Button)({
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0
    });
 * @param WrappedComponent 
 */
export function sstyled<Component extends React.ElementType>(
  WrappedComponent: Component
) {
  return (
    style:
      | React.ComponentProps<Component>["style"]
      | ((
          props: React.ComponentProps<Component> & Props
        ) => React.ComponentProps<Component>["style"])
  ): React.FC<React.ComponentProps<Component> & Props> => {
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
