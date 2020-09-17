//* SAUCE imp
import AsyncStorage from "@react-native-community/async-storage";
import * as React from "react";
import {
    PROPSCOMP,
    PROPS_ThemeProvider,
    storage,
    themeDark,
    themeLight
} from "utils";

/** REVIEW themeProviders
 * 
 * @module
 *  |_ ThemeContext - `createContext` for global theme
 *  |_ ThemeProvider - Main provider of the theme
 *  |_ withTheme() - Wrapper function
 *
 * @example
 *  In `app.tsx`
 *    import {ThemeProvider} from `engines`
 *    ...
 *    const [_theme,setTheme] = React.useState<Ttheme>(`themeLight`)
 *    ...
 *    return (
        <RootStoreProvider value={rootStore}>
          <ThemeProvider theme={_theme} setTheme={setTheme}> <--- here
            <...>
          </ThemeProvider> <--- and here
        </RootStoreProvider>
      )
    To setup theme switcher
      import {withTheme} from `engines/providers` //* can't use `engines` as `withTheme` must be imported directly
      ...
      function ThemeSwitcherButton(props) {
        const {theme: {C, dark}, setTheme} = props
        return (
          <Button onPress={()=> setTheme(dark? `themeLight` : `themeDark`)} >
            {dark? `Switch to Light Theme` : `Switch to Dark Theme`}
          </Button>
        )
      }
 */

export const ThemeContext = React.createContext(null);

export function ThemeProvider(props: PROPS_ThemeProvider) {
  const { theme } = props;
  const _themeColor = theme == `themeDark` ? themeDark : themeLight;

  const [_colors, setColors] = React.useState(_themeColor);
  const [_dark, setDark] = React.useState(theme === "themeDark" ? true : false);
  // console.log('(TContext) _theme: ', _theme);
  React.useEffect(() => {
    switch (theme) {
      case "themeLight":
        setColors(themeLight);
        setDark(false);
        storage.save("@app_preferences", { theme: "themeLight" });
        AsyncStorage.setItem(
          "@preferences",
          JSON.stringify({ theme: "themeLight" })
        );
        break;
      case "themeDark":
        setColors(themeDark);
        setDark(true);
        AsyncStorage.setItem(
          "@preferences",
          JSON.stringify({ theme: "themeDark" })
        );
        break;
      default:
        setColors(themeLight);
        setDark(false);
        AsyncStorage.setItem(
          "@preferences",
          JSON.stringify({ theme: "themeLight" })
        );
        break;
    }
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme: {
          C: _colors,
          dark: _dark,
        },
        setTheme: props.setTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

interface IPwithTheme extends PROPSCOMP {}

/**
 * @description Theme wrapper around React component to pass `theme` props and `setTheme` f(x)
 *
 * @param OGComponent: React component
 */
export function withTheme<P extends IPwithTheme = IPwithTheme>(
  OGComponent: React.ComponentType<P>
) {
  return class ThemedComponent extends React.Component<P & IPwithTheme> {
    render() {
      return (
        <ThemeContext.Consumer>
          {(contexts) => <OGComponent {...(this.props as P)} {...contexts} />}
        </ThemeContext.Consumer>
      );
    }
  };
}
