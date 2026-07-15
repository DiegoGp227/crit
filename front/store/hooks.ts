import { createTypedHooks } from "easy-peasy";
import { IAppStoreState } from "./store";

const typedHooks = createTypedHooks<IAppStoreState>();

export const useAppStoreActions = typedHooks.useStoreActions;
export const useAppStoreDispatch = typedHooks.useStoreDispatch;
export const useAppStoreState = typedHooks.useStoreState;
