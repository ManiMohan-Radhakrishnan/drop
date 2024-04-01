import appAxios from "./axios-utils";

export const nftCategoriesApi = (page) =>
  appAxios.get(`/categories?page=${page}`);

export const nftCategoryDetailApi = ({ slug }) =>
  appAxios.get(`/categories/${slug}`);

export const nftListApi = ({ slug, page }) =>
  appAxios.get(`/categories/${slug}/nfts?page=${page}`);

// export const nftDetailApi = ({ nft_slug }) => appAxios.get(`/nfts/${nft_slug}`);

export const nftDetailApi = ({ nft_slug, order_slug }) => {
  if (order_slug) {
    return appAxios.get(`/nfts/${nft_slug}?order_slug=${order_slug}`, {
      params: {
        time: new Date().getTime(),
      },
    });
  } else {
    return appAxios.get(`/nfts/${nft_slug}`, {
      params: {
        time: new Date().getTime(),
      },
    });
  }
};

export const nftMoreApi = ({ page }) => appAxios.get(`/nfts/more?page=${page}`);

export const nftBuyHistory = ({ nft_slug, page }) =>
  appAxios.get(`/nfts/${nft_slug}/buy_history?page=${page}`);

export const nftBidHistory = ({ nft_slug, page }) =>
  appAxios.get(`/nfts/${nft_slug}/bid_history?page=${page}`);

// export const nftBidWinner = ({ order_slug }) =>
//   appAxios.get(`/nfts/${order_slug}/bid_winner`);

export const nftBidWinner = ({ order_slug }) =>
  appAxios.get(`/orders/${order_slug}/bid_winner`);

export const nftBuyApi = (props) =>
  appAxios.post("/buys", { nft: { ...props } });

// export const nftBidApi = (props) =>
//   appAxios.post("/bids", { nft: { ...props } });

export const nftBidApi = ({ order_slug, order }) =>
  appAxios.post(`/orders/${order_slug}/bid`, { order });

export const nftMakeFav = ({ nft_slug }) =>
  appAxios.post(`/nfts/${nft_slug}/fav`);

export const nftMakeUnFav = ({ nft_slug }) =>
  appAxios.post(`/nfts/${nft_slug}/unfav`);

export const lootBuyApi = (props) =>
  appAxios.post("/buys/loot_box", { nft: { ...props } });

export const treasureCheck = () => appAxios.get("/users/total_own");

export const GetLootDetails = (slug) => appAxios.get(`/loots/${slug}`);

export const getNftPriceBreakup = (params) =>
  appAxios.get(`/users/payment_splits`, { params });

export const getPrebookPriceBreakup = ({ slug, request: preorder }) =>
  appAxios.put(`/loots/${slug}/preorders/splitup`, { preorder });

export const getDropPriceBreakup = ({ slug, request: loot }) =>
  appAxios.put(`/loots/${slug}/splitup`, { loot });

export const lootBoxPrebookApi = (slug, request) =>
  appAxios.post(`/loots/${slug}/preorders/preorder_users`, request);

export const lootBoxBuyApi = (slug, request) =>
  appAxios.put(`/loots/${slug}`, request);

// export const treasureList = () => appAxios.get("/treasures");

// export const treasureList = ({slug}) => appAxios.get(`/treasures/${slug}/user_treasures`);

// export const treasureClaim = (txid) => appAxios.put(`/treasures/${txid}`);
export const nftActiveOrders = ({ nft_slug }) =>
  appAxios.get(`/nfts/${nft_slug}/active_orders`);

export const nftOwnerApi = ({ nft_slug, page }) =>
  appAxios.get(`/nfts/${nft_slug}/owners?page=${page}`);

export const nftTransactionHistory = ({ nft_slug, page, order_slug }) => {
  if (order_slug) {
    return appAxios.get(
      `/nfts/${nft_slug}/transaction_histories?page=${page}`,
      {
        params: {
          order_slug: order_slug,
        },
      }
    );
  } else {
    return appAxios.get(`/nfts/${nft_slug}/transaction_histories?page=${page}`);
  }
};

export const nftUpgradeHistory = ({ nft_slug, page, order_slug }) => {
  if (order_slug) {
    return appAxios.get(`/nfts/${nft_slug}/upgrade_history?page=${page}`, {
      params: {
        order_slug: order_slug,
      },
    });
  } else {
    return appAxios.get(`/nfts/${nft_slug}/upgrade_history?page=${page}`);
  }
};

export const orderBidHistory = ({ order_slug, page }) =>
  appAxios.get(`/orders/${order_slug}/bid_history?page=${page}`);

export const orderPurchaseDetailsApi = ({ order_slug, page }) =>
  appAxios.get(`/orders/${order_slug}/purchase_details?page=${page}`);

export const carBiddingDetailsApi = (slug) =>
  appAxios.get(`/drops/nfts/${slug}`);
