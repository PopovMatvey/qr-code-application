import { Html5Qrcode } from "html5-qrcode";
import React, { useState, useEffect } from "react";
import "./css/style.css";

export function QRscaner() {
  const [qrMessage, setQrMessage] = useState("");
  const [inputRange, setInputRange] = useState(200);

  const handlerInputRange = (event) => {
    setInputRange(event.target.value);
  }

  useEffect(() => {
    const config = { fps: 30, qrbox: { width: inputRange, height: inputRange } };
    const html5QrCode = new Html5Qrcode("qrCodeContainer");
    const qrCodeContainer = document.querySelector('#qrCodeContainer');

    qrCodeContainer.style.width = `${inputRange}px`;
    qrCodeContainer.style.height = `${inputRange}px`;

    const qrCodeSuccess = (decodedText) => {
      setQrMessage(decodedText);
    };

    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess);
  }, [inputRange]);

  return (
    <>
      <div className="scaner">
        <div id="qrCodeContainer" />
        <input type="range" step={100} min={200} max={500} onChange={handlerInputRange} value={inputRange} />
      </div>
      {qrMessage && <div className="qr-message">{qrMessage}</div>}
    </>
  );
}

export default App;
