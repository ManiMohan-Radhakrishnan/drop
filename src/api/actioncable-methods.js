import { baseCable, nftCable } from "./actioncable-utils";

export const buyDetail = (slug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `buy_detail_${slug}` },
    {
      connected: () => {
        console.log("BL/AC1:Connected");
      },
      received: (data) => {
        console.log("BL/AC1:Success");
        value(data);
      },
    }
  );
};

export const bidDetail = (slug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `bid_detail_${slug}` },
    {
      connected: () => {
        console.log("BL/AC2:Connected");
      },
      received: (data) => {
        console.log("BL/AC2:Success");
        value(data);
      },
    }
  );
};

export const pageView = (slug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `page_view_${slug}` },
    {
      connected: () => {
        console.log("BL/AC3:Connected");
      },
      received: (data) => {
        console.log("BL/AC3:Success");
        value(data);
      },
    }
  );
};

export const totalFav = (slug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `fav_view_${slug}` },
    {
      connected: () => {
        console.log("BL/AC4:Connected");
      },
      received: (data) => {
        console.log("BL/AC4:Success");
        value(data);
      },
    }
  );
};

// export const winnerDetail = (slug, value) => {
//   nftCable.subscriptions.create(
//     { channel: "NftChannel", room: `winner_detail_${slug}` },
//     {
//       connected: () => {
//         console.log("BL/AC5:Connected");
//       },
//       received: (data) => {
//         console.log(data, "data.winner BL/AC5");

//         console.log("BL/AC5:Success");
//         value(data);
//       },
//     }
//   );
// };

export const winnerDetail = (nftSlug, orderSlug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `${nftSlug}_accept_bid_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC5:Connected");
      },
      received: (data) => {
        console.log("BL/AC5:Success");
        value(data);
      },
    }
  );
};

export const userBuyDetail = (nftSlug, userSlug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `buy_detail_${nftSlug}_${userSlug}` },
    {
      connected: () => {
        console.log("BL/AC6:Connected");
      },
      received: (data) => {
        console.log("BL/AC6:Success");
        value(data);
      },
    }
  );
};

export const userBidDetail = (nftSlug, userSlug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `bid_detail_${nftSlug}_${userSlug}` },
    {
      connected: () => {
        console.log("BL/AC7:Connected");
      },
      received: (data) => {
        console.log("BL/AC7:Success");
        value(data);
      },
    }
  );
};

export const lootDetail = (slug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `loot_detail_${slug}` },
    {
      connected: () => {
        console.log("BL/AC8:Connected");
      },
      received: (data) => {
        console.log("BL/AC8:Success");
        value(data);
      },
    }
  );
};

export const categoryNftDetail = (slug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `category_nfts_list_${slug}` },
    {
      connected: () => {
        console.log("BL/AC9:Connected");
      },
      received: (data) => {
        console.log("BL/AC9:Success");
        value(data);
      },
    }
  );
};

export const accountDetail = (slug, value) => {
  baseCable.subscriptions.create(
    { channel: "UserChannel", room: `account_${slug}` },
    {
      connected: () => {
        console.log("connected");
      },
      received: (data) => {
        value(data);
      },
    }
  );
};

export const lootAvailableQty = async (slug, value) => {
  nftCable.subscriptions.create(
    { channel: "LootChannel", room: `loot_${slug}` },
    {
      connected: () => {
        console.log("BL/AC16:Connected");
      },
      received: (data) => {
        console.log("BL/AC16:Success");
        value(data);
      },
    }
  );
};

export const acceptBid = (nftSlug, orderSlug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `${nftSlug}_accept_bid_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC9:Connected");
      },
      received: (data) => {
        console.log("BL/AC9:Success");
        value(data);
      },
    }
  );
};

export const cancelSaleDetail = (nftSlug, orderSlug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `${nftSlug}_order_cancel_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC8:Connected");
      },
      received: (data) => {
        console.log("BL/AC8:Success");
        value(data);
      },
    }
  );
};

export const orderPurchaseDetails = (nftSlug, orderSlug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `${nftSlug}_order_purchase_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC11:Connected");
      },
      received: (data) => {
        console.log("BL/AC11:Success");
        value(data);
      },
    }
  );
};

export const outDatedBid = (nftSlug, orderSlug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `${nftSlug}_bid_outdated_${orderSlug}` },
    {
      connected: () => {
        console.log("BL/AC12:Connected");
      },
      received: (data) => {
        console.log("BL/AC12:Success");
        value(data);
      },
    }
  );
};

export const ownerDetails = (slug, value) => {
  nftCable.subscriptions.create(
    { channel: "NftChannel", room: `owner_detail_${slug}` },
    {
      connected: () => {
        console.log("BL/AC10:Connected");
      },
      received: (data) => {
        console.log("BL/AC10:Success");
        value(data);
      },
    }
  );
};
