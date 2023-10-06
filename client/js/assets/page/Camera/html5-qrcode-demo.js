function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// const [size, setSize] = useState(100);
let size = 500;
docReady(function () {
    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult, countResults = 0;

    var html5QrcodeScanner = new Html5QrcodeScanner(
        // "qr-reader", { fps: 10, qrbox: 250 });
        "qr-reader", { fps: 10, qrbox: size });

    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            console.log(`Scan result = ${decodedText}`, decodedResult);

            resultContainer.innerHTML += `<div>[${countResults}] - ${decodedText}</div>`;

            resultContainer.innerHTML += `
            <h5 className='custom-slider-text'>Размер сканера: [${size}]</h5>
            <input
            type='range'
            onChange= [${onChangeSlider}]
            min=[${50}]
            max=[${250}]
            step=[${1}]
            value=[${size}]
            className='custom-slider'>
            </input>
            `;
            // Optional: To close the QR code scannign after the result is found
            html5QrcodeScanner.clear();
        }
    }

    // Optional callback for error, can be ignored.
    function onScanError(qrCodeError) {
        // This callback would be called in case of qr code scan error or setup error.
        // You can avoid this callback completely, as it can be very verbose in nature.
    }
    const onChangeSlider = (e) => {
        // setMyKey(e.target.value);
        // handleForceupdateMethod();
        // setMyKey(e.target.value);
        // setSize(e.target.value);
        size = e.target.value;
    }
    //   <h5 className='custom-slider-text'>Размер сканера: {size}</h5>
    //   <input
    //     type='range'
    //     onChange={onChangeSlider}
    //     min={50}
    //     max={250}
    //     step={1}
    //     value={size}
    //     className='custom-slider'>
    //   </input>

    html5QrcodeScanner.render(onScanSuccess, onScanError);
});