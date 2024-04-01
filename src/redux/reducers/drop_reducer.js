import {
  RADDX_LAND_DROP,
  RADDX_LOOT_DROP,
  RADDX_ONE_DROP,
} from "../actions/drop_action";

const initState = {
  raddxLootStatus: null,
  raddxLandStatus: null,
  raddxOneStatus: null,
};

const drop_reducer = (state = initState, { payload, type }) => {
  if (type === RADDX_LOOT_DROP) {
    state = { ...state, raddxLootStatus: payload };
  }
  if (type === RADDX_LAND_DROP) {
    state = { ...state, raddxLandStatus: payload };
  }
  if (type === RADDX_ONE_DROP) {
    state = { ...state, raddxOneStatus: payload };
  }
  return state;
};
export const getRaddxLootStatus = (state) => state.drop?.raddxLootStatus;
export const getRaddxOneStatus = (state) => state.drop?.raddxOneStatus;
export const getRaddxLandStatus = (state) => state.drop?.raddxLandStatus;

export default drop_reducer;
