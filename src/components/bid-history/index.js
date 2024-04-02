import React, { useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal, Table } from "react-bootstrap";
import { IoIosRocket } from "react-icons/io";
import { BiX } from "react-icons/bi";

import BidCard from "./bid-card";
import BidName from "./bid-name";
import userImg from "../../images/user_1.png";
import stanlee from "../../images/drops/stan-lee-beyond-life.jpg";
import { nftBidHistory, orderBidHistory } from "../../api/methods";
import { currencyFormat } from "../../utils/common";
import { TableLoader } from "../nft-basic-details/content-loader";

import "./style.scss";

const BidHistory = ({
  setBidExpiry = () => {},
  setIsBidder = () => {},
  nft,
  histories = [],
  isAuctionEnded,
  totalCount,
  bidExpired,
  orderDetails,
}) => {
  const { slug } = useParams();
  const { user } = useSelector((state) => state.user.data);
  const [modalShow, setModalShow] = useState(false);
  const [bidHistories, setBidHistories] = useState({});
  const [page, setPage] = useState(1);
  const [bidHistoryList, setBidHistoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async (pageNo) => {
    try {
      let result = await orderBidHistory({
        order_slug: orderDetails?.slug,
        page: pageNo,
      });
      setBidHistoryList([...bidHistoryList, ...result.data.data.histories]);
      setBidHistories(result.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const fetchMoreHistory = () => {
    if (bidHistories.next_page) {
      fetchHistory(page + 1);
      setPage(page + 1);
    }
  };

  const handleClick = async () => {
    setModalShow(true);
    try {
      setLoading(true);
      let history = await orderBidHistory({
        order_slug: orderDetails?.slug,
        page: page,
      });
      setBidHistories(history.data.data);
      setBidHistoryList(history.data.data.histories);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleClose = () => {
    setModalShow(false);
    setPage(1);
    setBidHistories({});
    setBidHistoryList([]);
  };

  return (
    <>
      <div className="bid-history if_bid_empty_cell">
        <div className="bid-history-title-content">
          <div className="bid-history-title">History</div>
          <div className="bid-history-filter">
            {/* <div className="me-2">
              <Nav>
                <NavDropdown
                  title="Sort By"
                  menuVariant="white"
                  align="end"
                  className="history-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    First bid to last
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Last bid to first
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div> */}
            {/* {histories.length > 0 && (
              <AiOutlineExpand
                role="button"
                style={{ color: "#fff" }}
                size={25}
                onClick={() => setModalShow(true)}
              />
            )} */}
          </div>
        </div>

        {histories.length > 0 ? (
          <div className="bid-history-content">
            {histories.map((history, i) => (
              <BidCard
                setBidExpiry={setBidExpiry}
                setIsBidder={setIsBidder}
                key={`biy-history${i}`}
                history={history}
                latestIndex={i}
                bidExpired={bidExpired}
                isAuctionEnded={isAuctionEnded}
                orderDetails={orderDetails}
              />
            ))}

            {totalCount <= histories.length ? (
              // <BidCard isEnd />
              <></>
            ) : (
              <div className="bid-histroy-card">
                <div className="history-end-content">
                  <span role="button" onClick={handleClick}>
                    View More
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bid-empty-content">
            <div className="empty-top-container">
              <div className="empty-top-content">
                <IoIosRocket color="#edededcc" />
                {isAuctionEnded ? (
                  <div className="empty-text">
                    Auction has ended. <br />
                    No active bids.
                  </div>
                ) : (
                  <div className="empty-text">
                    No active bids yet. <br />
                    Be the first to make a bid.
                  </div>
                )}
              </div>
            </div>

            {/* <div className="empty-bottom-content">
              <img src={stanlee} alt="" />
              <div className="nft-owner-history-details">
                <div className="publish-time text-secondary">
                  {dayjs(nft.auction_start_time).format("MMM D, YYYY hh:mm A")}
                </div>
                <div className="nft-owner">
                  Jump.trade
                </div>
              </div>
            </div> */}
          </div>
        )}
      </div>
      <Modal size="xl" centered show={modalShow} className="history-modal">
        <Modal.Header className="bg-dark p-0">
          <Modal.Title className="flex-fill">
            <div className="modal-bid-history-title-content">
              <div className="modal-bid-history-title">History</div>
              <div className="modal-bid-history-filter">
                {/* <div className="me-2">
                  <Nav>
                    <NavDropdown
                      title="Sort By"
                      menuVariant="white"
                      align="end"
                      className="history-dropdown"
                    >
                      <NavDropdown.Item href="#action/3.1">
                        First bid to last
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Last bid to first
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </div> */}
                {/* <BsFullscreenExit
                  role="button"
                  style={{ color: "#fff" }}
                  size={25}
                  onClick={() => setModalShow(false)}
                /> */}
                <BiX
                  role="button"
                  style={{ color: "#fff" }}
                  size={25}
                  onClick={handleClose}
                />
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <TableLoader />
          ) : (
            <Table
              responsive="lg"
              className="history-table-expand mb-0"
              style={{ fontSize: ".7rem" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event</th>
                  <th>Bider</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Price Change</th>
                  <th className="text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {bidHistoryList.map((history, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>Bid placed by</td>
                    <td>
                      <BidName
                        imgUrl={
                          !history.private && history.avatar_url
                            ? history.avatar_url
                            : user?.slug === history.slug && history.avatar_url
                            ? history.avatar_url
                            : userImg
                        }
                        text={
                          !history.private && history.user_name
                            ? history.user_name
                            : user?.slug === history.slug
                            ? `@${user.first_name}${user.last_name}`
                            : history.user_name
                        }
                        isTable
                        slug={history.slug}
                      />
                    </td>
                    <td className="text-center">
                      <div className="usd-value">
                        {currencyFormat(history.bid_amount, "USD")}
                      </div>
                    </td>
                    <td className="text-center text-success">
                      {`${history.bid_change.toFixed(2)}%`}
                    </td>
                    <td className="text-center">
                      <div className="date">
                        {dayjs(history.created_at).format(
                          "MMM D, YYYY hh:mm A"
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {bidHistories.next_page ? (
                  <tr>
                    <td
                      className="text-center text-secondary p-3 load-more-row"
                      colSpan="6"
                    >
                      <span role="button" onClick={fetchMoreHistory}>
                        Load More
                      </span>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="text-center text-secondary p-3" colSpan="6">
                      You've reached the end of the list
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BidHistory;
