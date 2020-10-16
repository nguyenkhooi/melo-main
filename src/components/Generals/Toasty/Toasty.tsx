import { CIRCULAR_BOLD, IconPrimr } from "assets";
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import Toast from "react-native-fast-toast";
import { colors, scale } from "utils";

/**
 * A Toast component for react-native, supports Android, IOS, Web, Windows
 *
 * ---
 * @example
 *
 * ```
 * <Text onPress={()=> Toasty.show("Hello mf", { type: "success" })}>Toast!</Text>
 * ```
 * - In `App.tsx`, add: `<Toasty ref={(ref) => Toasty.setRef(ref)} />`
 * ---
 * @version 0.10.16
 * - *(Preset icon)*
 * - *(Add `update()`)*
 * - *(Build this up)*
 *
 * @author nguyenkhooi
 * @see https://github.com/arnnis/react-native-fast-toast
 */
export class Toasty extends React.PureComponent<P_> {
  refToast = React.createRef<Toast>();

  static _ref: null | Toasty = null;

  static setRef(ref: null | Toasty = null) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }
  static show(message: string, p_: ToastOptions) {
    let id = this._ref?._show(message, p_);
    return id;
  }

  static update(id: string, message: string, p_: ToastOptions) {
    this._ref?._update(id, message, p_);
  }
  /**
   * SECTION FUNCTION
   * -------------------------------------
   */
  _show(message: string, p_: ToastOptions) {
    const icon =
      p_.icon === "loading" ? <ActivityIndicator color="white" /> : p_.icon;
    const options: ToastOptions = { ...p_, icon };
    //@ts-ignore
    let id = this.refToast.current?.show(message, options);
    return id;
  }

  // _show = this.refToast.current?.show;

  _update(id: string, message: string, options: ToastOptions) {
    //@ts-ignore
    this.refToast.current?.update(id, message, options);
  }

  render() {
    return (
      <Toast
        ref={this.refToast}
        duration={2000}
        textStyle={{ fontSize: 12, fontFamily: CIRCULAR_BOLD }}
        style={{ opacity: 0.9, paddingVertical: 5 }}
        successColor={colors.success}
        dangerColor={colors.danger}
        warningColor={colors.warning}
        successIcon={
          <IconPrimr preset={"safe"} name={"check"} size={12} color={"white"} />
        }
        dangerIcon={
          <IconPrimr preset={"safe"} name={"x"} size={12} color={"white"} />
        }
        warningIcon={
          <IconPrimr
            preset={"safe"}
            name={"exclamation_circle"}
            size={12}
            color={"white"}
          />
        }
        {...this.props}
      />
    );
  }
}

interface P_ extends Partial<Toast> {}

export interface ToastOptions {
  icon?: JSX.Element | "loading";
  type?: "normal" | "success" | "danger" | "warning";
  duration?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  successIcon?: JSX.Element;
  dangerIcon?: JSX.Element;
  warningIcon?: JSX.Element;
  successColor?: string;
  dangerColor?: string;
  warningColor?: string;
  onPress?(id: string): void;
}
