import * as UIKT from "@ui-kitten/components";
// const NB = { ...require("native-base") }

// import {withTheme} from '@engines/providers';

/**
 *
 * @description Customized UI Kitten components befonre export it as <Kitten.[]>
 */

export const Kitt = { ...UIKT };

export type dAccessory = {
  style: {
    height: number;
    marginHorizontal: number;
    tintColor: string;
    width: number;
  };
};
// export default Kitt;
