export const RADDX_LOOT_DROP = "RADDX_LOOT_DROP";
export const RADDX_LAND_DROP = "RADDX_LAND_DROP";
export const RADDX_ONE_DROP = "RADDX_ONE_DROP";

export const raddx_loot_drop_action = (input) => {
  return {
    type: RADDX_LOOT_DROP,
    payload: input,
  };
};

export const raddx_land_drop_action = (input) => {
  return {
    type: RADDX_LAND_DROP,
    payload: input,
  };
};

export const raddx_one_drop_action = (input) => {
  return {
    type: RADDX_ONE_DROP,
    payload: input,
  };
};
