import React, { useState } from "react";
import AppHelmet from "../components/helmet";
import Header from "../components/landing-home/header";
import BrandEnquiryForm from "../components/raddax-nft/brand-enquiry-form";
import Footer from "../components/raddax-nft/footer";

const BrandEnquiry = () => {
  const [sticky, setSticky] = useState(false);
  return (
    <>
      <AppHelmet
        title={"Car NFTs | Digital Lands | RADDX Racing Game Metaverse"}
        description={
          "The RADDX Car Racing Game Metaverse Brings You A Garage Of Super-Awesome Racing Cars, Accessories, & Rewards. You Can Even Own Digital Land!"
        }
        image={
          "https://cdn.guardianlink.io/product-hotspot/images/raddx/Raddx-Banner-OGimage-Feb13.jpg"
        }
      />
      <Header sticky={sticky} />
      <BrandEnquiryForm />
      <Footer />
    </>
  );
};

export default BrandEnquiry;
