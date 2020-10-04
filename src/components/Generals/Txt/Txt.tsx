import { Text } from "@ui-kitten/components";
// import { scale } from "utils";
import { sstyled } from "../../Sstyled";
const scale = (number: number) => number;

const H1: typeof Text = sstyled(Text)({
  fontSize: scale(36) * 2,
  fontWeight: "800",
});
const H2: typeof Text = sstyled(Text)({
  fontSize: scale(32) * 2,
  fontWeight: "800",
});
const H3: typeof Text = sstyled(Text)({
  fontSize: scale(30) * 2,
  fontWeight: "800",
});
const H4: typeof Text = sstyled(Text)({
  fontSize: scale(26) * 2,
  fontWeight: "800",
});
const H5: typeof Text = sstyled(Text)({
  fontSize: scale(22) * 2,
  fontWeight: "800",
});
const H6: typeof Text = sstyled(Text)({
  fontSize: scale(18) * 2,
  fontWeight: "800",
});
const S1: typeof Text = sstyled(Text)({
  fontSize: scale(15) * 2,
  fontWeight: "600",
});
const S2: typeof Text = sstyled(Text)({
  fontSize: scale(13) * 2,
  fontWeight: "600",
});
const P1: typeof Text = sstyled(Text)({
  fontSize: scale(15) * 2,
  fontWeight: "400",
});
const P2: typeof Text = sstyled(Text)({
  fontSize: scale(13) * 2,
  fontWeight: "400",
});
const C1: typeof Text = sstyled(Text)({
  fontSize: scale(12) * 2,
  fontWeight: "800",
});
const C2: typeof Text = sstyled(Text)({
  fontSize: scale(12) * 2,
  fontWeight: "800",
});

/**
 * A text component of the project,
 * depending on ui-kitten's Text
 *
 * @example
 * <Txt.P1>👋</Txt.P1>
 * @version 0.10.4
 */
export const Txt = {
  /** Heading 1 */
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  /** Subheading 1 */
  S1,
  S2,
  P1,
  P2,
  C1,
  C2,
};
// export const Txt = Text;
