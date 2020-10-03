import React from "react";
import { dSCR } from "utils";

/**
 * "Super" styled component. 
 * Mimicking `styled-components`, with RN props (and Typescript)
 * 
 * @example
 * const RoundedButton = sstyled(Button)((p)=> {
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: contrastColor(p),
    });
 *
 * @version 1.10.3
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
