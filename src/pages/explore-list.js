import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import Explore from "../components/explore";
import Header from "../components/header";
import { nftListApi } from "../api/methods";
import { categoryNftDetail } from "../api/actioncable-methods";

const ExploreList = () => {
  const { slug } = useParams();
  const [list, setList] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nftSocketData, setNftSocketData] = useState({});

  useEffect(() => {
    categoryNftDetail(slug, (data) => {
      setNftSocketData(data);
    });

    nftList(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nftList = async (page) => {
    try {
      setLoading(true);
      let response = await nftListApi({ slug, page });
      setList([...list, ...response.data.data.nfts]);
      setHasNext(response.data.data.next_page);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const fetchMore = () => {
    if (hasNext) {
      setLoadingMore(true);
      nftList(page + 1);
      setPage(page + 1);
      setLoadingMore(false);
    }
  };

  return (
    <>
      <Header />
      <Explore
        list={list}
        loading={loading}
        loadingMore={loadingMore}
        handleClick={fetchMore}
        hasNext={hasNext}
        nftSocketData={nftSocketData}
      />
    </>
  );
};

export default ExploreList;
