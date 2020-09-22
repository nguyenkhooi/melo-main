import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { MediaStore } from "../media-store/media.store";
// import { NavigationStoreModel } from "../../navigation/navigation-store";

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore")
  .props({
    mediaStore: types.optional(MediaStore(), {}),
    // navigationStore: types.optional(NavigationStoreModel, {}),
    // userStore: types.optional(UserStore(), {}),
    // requestStore: types.optional(PostsStore(), {}),
  })
  .actions((self) => {
    return {
      rROOTSTR() {
        console.log("rROOT");
        // applySnapshot(self, { navigationStore: self.navigationStore });
      },
    };
  });

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
