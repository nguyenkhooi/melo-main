import React from "react";
import { dSCR } from "utils";

/**
 * @example
 * const RoundedButton = sstyled(Button)((C)=> {
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
    return (props: dSstyled) => {
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

/**
 * Ideally, sstyled() component will inherit screen props,
 * so if we have universal screen props, extend dSstyled with it
 */
interface dSstyled extends dSCR {
  style: any;
}
