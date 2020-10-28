// import { useDoc } from "engines";
// import { eDoc4 } from "engines/hooks/useDoc/use-doc.props";
// import firebase from "firebase/app";
import React, { useContext } from "react";
import { colors, DARKEE, dColors, LIGHTEE } from "utils";
// import { auth, db } from "../firebase";

/** 
 * 
 * @module
 *  - |_ AppContext - `createContext` for the app
 *  - |_ AppProvider - Main provider of the app
 *  - |_ useAppContext() - hook fn
 * @version 0.10.28
 * - *Update theme w frbs*
 * @author nguyenkhooi
 * ---
 * @example
 *  In `app.tsx`
 *    import {AppProvider} from `engines`
 *    ...
 *    const [_theme,setTheme] = React.useState<THEME>(`themeLight`)
 *    ...
 *    return (
        <RootStoreProvider value={rootStore}>
          <AppProvider theme={_theme} setTheme={setTheme}> <--- here
            <...>
          </AppProvider> <--- and here
        </RootStoreProvider>
      )
    `To setup theme switcher`
      import {useAppContext} from "engines"
      ...
      const ThemeSwitcherButton = (props) => {
        const {C, dark, setTheme} = useAppContext()
        return (
          <Button onPress={()=> setTheme(dark? `themeLight` : `themeDark`)} >
            {dark? `Switch to Light Theme` : `Switch to Dark Theme`}
          </Button>
        )
      }
 */
export function AppProvider(props: dAppProvider) {
  const { theme, setTheme, children } = props;
  /**
   * ----$-FRBS-USER--------------------
   *
   */
  //   const [currentUser, setCurrentUser] = useState<
  //     firebase.User | null | undefined
  //   >();
  //   const [userDoc, dispatchUserDoc] = useDoc({});

  /**
   *  Check userInfo
   */
  //   React.useEffect(
  //     function handleStatusChange() {
  //       return auth.onAuthStateChanged(setCurrentUser);
  //       // console.log("userInfo existed: ", _frbsAuthe != null)
  //     },
  //     [currentUser]
  //   );

  //   React.useEffect(
  //     function fetchCurrentUser() {
  //       if (userDoc.doc) {
  //         /**
  //          * Check if frbs's theme is in THEME
  //          * - ✅: set app's theme from it
  //          * = ❌: set themeLight
  //          */

  //         Object.values(THEME).includes(userDoc.doc.theme)
  //           ? setTheme(userDoc.doc.theme)
  //           : db.doc(userDoc.path).update({
  //               theme: THEME.LIGHT.toString(),
  //             });
  //       } else if (
  //         !userDoc.doc &&
  //         !userDoc.loading &&
  //         userDoc.path &&
  //         currentUser
  //       ) {
  //         const userFields = ["email", "displayName", "photoURL", "phoneNumber"];
  //         const userData = userFields.reduce((acc, curr) => {
  //           if (currentUser[curr]) {
  //             return { ...acc, [curr]: currentUser[curr] };
  //           }
  //           return acc;
  //         }, {});
  //         db.doc(userDoc.path).set(
  //           {
  //             tables: {},
  //             user: userData,
  //             theme: THEME.LIGHT.toString(),
  //           },
  //           { merge: true }
  //         );
  //       }
  //     },
  //     [userDoc]
  //   );

  //   useEffect(
  //     function dispatchCurrentUser() {
  //       if (currentUser) {
  //         dispatchUserDoc({
  //           type: eDoc4.custom,
  //           payload: { path: `_FT_USERS/${currentUser.uid}` },
  //         });
  //       }
  //     },
  //     [currentUser]
  //   );
  //*------------------------------

  //*----$-THEME--------------------
  const _themeColor = theme == THEME.DARK ? DARKEE : LIGHTEE;
  const [_colors, setColors] = React.useState(_themeColor);
  const [_dark, setDark] = React.useState(theme === THEME.DARK ? true : false);

  React.useEffect(
    function setupTheme() {
      switch (theme) {
        case THEME.LIGHT:
          setColors(LIGHTEE);
          setDark(false);
          // storage.save("@app_preferences", { theme: "themeLight" });
          // AsyncStorage.setItem("@preferences", JSON.stringify({ theme: "themeLight" }))
          break;
        case THEME.DARK:
          setColors(DARKEE);
          setDark(true);
          // AsyncStorage.setItem("@preferences", JSON.stringify({ theme: "themeDark" }))
          break;
        default:
          setColors(LIGHTEE);
          setDark(false);
          // AsyncStorage.setItem("@preferences", JSON.stringify({ theme: "themeLight" }))
          break;
      }
      console.log("💋 Current theme: ", theme.toString());
      //   setTimeout(() => {
      //     !!userDoc &&
      //       !!userDoc.path &&
      //       db.doc(userDoc.path).update({
      //         theme: theme.toString(),
      //       });
      //   }, 1000);
    },
    [theme]
  );
  //*------------------------------

  return (
    <AppContext.Provider
      value={{
        // userDoc: { state: userDoc, dispatch: dispatchUserDoc },
        // currentUser,
        C: _colors,
        dark: _dark,
        setTheme: props.setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const AppContext = React.createContext<dAppContext>({
  //   currentUser: undefined,
  //   userDoc: undefined,
  C: colors,
  dark: false,
  setTheme: () => {},
});

/**
 * App context hook
 *
 * ---
 * @example
 * ```
 * const { C, dark, setTheme } = useAppContext()
 * ```
 *
 * @version 0.10.19
 * @author nguyenkhooi
 */
export const useAppContext = () => useContext(AppContext);

interface dAppProvider {
  children: React.ReactNode;
  theme: THEME;
  setTheme(name: THEME): void;
}

interface dAppContext {
  //   currentUser: firebase.User | null | undefined;
  //   userDoc: dUser;
  C: dColors;
  dark: boolean;
  setTheme(name: THEME): void;
}

interface dUser {
  dispatch: {};
  state: {
    doc: {
      tables: any;
      theme: THEME;
      user: dPersonali;
    };
  };
}

interface dPersonali {
  displayName: string;
  email: string;
  phoneNumber: string | number;
}

/**
 * List of theme index
 *
 */
export enum THEME {
  LIGHT,
  DARK,
}
