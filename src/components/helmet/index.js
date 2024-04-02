// import Head from "next/head";
// import Script from "next/script";
// import Image from "next/image";

import useWindowUtils from "../../hook/useWindowUtils";
//import { FB_PIXEL_ID } from "../../utils/fbpixel";

const AppHelmet = ({
  title,
  description,
  image,
  canonical,
  hideCanonical = false,
  height,
  width,
  recentSoldContent = false,
}) => {
  const windowUtils = useWindowUtils();
  const { width: innerWidth } = windowUtils;
  return (
    <>
      <head>
        {title && <title>{title} </title>}
        {description && <meta name="description" content={description} />}

        {title && <meta property="og:title" content={title} />}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={windowUtils.href} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:site_name" content="Jump.Trade" />
        {description && (
          <meta property="og:description" content={description} />
        )}
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}

        {recentSoldContent && <meta name="robots" content="noindex" />}

        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:card" content="summary" />
        {canonical && <meta name="twitter:site" content={canonical} />}
        {title && <meta name="twitter:title" content={title} />}
        {image && <meta name="twitter:image" content={image} />}
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        <meta name="twitter:author" content="Jump.trade" />
        {canonical && <meta name="twitter:url" content={canonical} />}
        <meta name="twitter:cta" content="Explore more on Jump.trade" />
        {image && <meta itemProp="image" content={image} />}
        {!hideCanonical && (
          <link
            rel="canonical"
            href={canonical ? canonical : windowUtils.href?.split(/[?#]/)[0]}
          />
        )}
        <script
          type="text/javascript"
          src="https://cdn.addevent.com/libs/atc/1.6.1/atc.min.js"
          async
          defer
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/add-to-calendar-button@2"
          async
          defer
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.addeventasync = function () {
        addeventatc.settings({
          license: "adEbuIrxyzcIumHaxmls157809",
        });
      };`,
          }}
        ></script>
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async=""
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "249bf585-42c9-4b21-a900-e768e414c466",
    });
  });`,
          }}
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `!function(q,e,v,n,t,s){if(q.qp) return; n=q.qp=function(){n.qp?n.qp.apply(n,arguments):n.queue.push(arguments);}; n.queue=[];t=document.createElement(e);t.async=!0;t.src=v; s=document.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);}(window, 'script', 'https://a.quora.com/qevents.js');qp('init', '872682fdaae44295a53167a1dfa7b9f4');qp('track', 'ViewContent');`,
          }}
        ></script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://q.quora.com/_/ad/872682fdaae44295a53167a1dfa7b9f4/pixel?tag=ViewContent&noscript=1"
          />
        </noscript>
      </head>
      {innerWidth > 800 && (
        <>
          <script
            strategy="lazyOnload"
            src="https://snippets.freshchat.com/js/fc-pre-chat-form-v2.min.js"
          ></script>
          <script
            id="fresh-chat"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
var preChatTemplate = {
mainbgColor: "#103426",
maintxColor: "#fff",
heading: "Jump.trade",
textBanner:
"We can't wait to talk to you. But first, please take a couple of moments to tell us a bit about yourself.",
SubmitLabel: "Start Chat",
fields: {
field1: {
type: "name",
label: "Name",
fieldId: "name",
required: "yes",
error: "Please Enter a valid name",
},
field2: {
type: "email",
label: "Email",
fieldId: "email",
required: "yes",
error: "Please Enter a valid Email",
},
field3: {
type: "phone",
label: "Phone",
fieldId: "phone",
required: "yes",
error: "Please Enter a valid Phone Number",
},
},
};
window.fcSettings = {
token: "adba5f62-7b67-42e0-99d7-182cb83a0e74",
host: "https://wchat.in.freshchat.com",
config: {
cssNames: {
widget: "custom_fc_frame",
expanded: "custom_fc_expanded",
},
},
onInit: function () {
console.log("widget init");
fcPreChatform.fcWidgetInit(preChatTemplate);
window.fcWidget.on("widget:opened", function () {
// window.setFiredeskdetails();
});
},
};
`,
            }}
          />
        </>
      )}

      <script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, l, i) {
w[l] = w[l] || [];
w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
var f = d.getElementsByTagName(s)[0],
j = d.createElement(s),
dl = l != "dataLayer" ? "&l=" + l : "";
j.async = true;
j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-NN37BTB"); `,
        }}
      />
      {innerWidth > 560 && (
        <script
          strategy="lazyOnload"
          src="https://wchat.freshchat.com/js/widget.js"
          async
        ></script>
      )}

      {/* <Script
        type="text/javascript"
        src="https://cdn.addevent.com/libs/atc/1.6.1/atc.min.js"
        async
        defer
      />
      <Script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `window.addeventasync = function () {
        addeventatc.settings({
          license: "adEbuIrxyzcIumHaxmls157809",
        });
      };`,
        }}
      /> */}
      {/* 
      <script
        strategy="lazyOnload"
        src="https://unpkg.com/focus-visible@5.0.2/dist/focus-visible.js"
        defer
      />
      <script
        strategy="lazyOnload"
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous"
      />
      <script
        id="hotjar"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3223202,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      /> */}
      {/* <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NN37BTB"
          height="0"
          width="0"
           style={"display: none; visibility: hidden"}
        ></iframe>
      </noscript>
      <noscript> */}
      {/* <img
          height="1"
          width="1"
          
        /> */}
      {/* <Image
          height={1}
          width={1}
          alt="fbPixel"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        /> */}
      {/* </noscript> */}
    </>
  );
};

export default AppHelmet;
