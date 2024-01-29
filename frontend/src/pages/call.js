import React, { useRef, useEffect } from "react";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const Call = () => {
  const myRef = useRef(null);

  useEffect(() => {
    const loadZegoPrebuilt = async () => {
      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );
      const roomID = "er35g";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        1975564691,
        "2418eee8fad84587656665f7b026e787",
        "12345",
        randomID(5),
        randomID(5)
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: myRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };
    loadZegoPrebuilt();
  }, []); // Make sure to pass an empty dependency array to useEffect to mimic componentDidMount

  return <div>Call</div>;
};

export default Call;
