import { DBR, ScanRegion } from 'capacitor-plugin-dynamsoft-barcode-reader';
import { useEffect } from 'react';

const QRCodeScanner = (props: { isActive: boolean; 
  cameraID?: string;
  resolution?: number;
  torchOn?: boolean; 
  zoom?: number;
  scanRegion?:ScanRegion}) => {
    
  useEffect(() => {
    console.log("update active");
    if (props.isActive) {
      DBR.startScan();
    }else{
      DBR.stopScan();
    }
  }, [props.isActive]);

  useEffect(() => {
    if (props.torchOn != undefined) {
      if (props.torchOn == true) {
        console.log("torch on");
        DBR.toggleTorch({"on":true});
      }else{
        console.log("torch off");
        DBR.toggleTorch({"on":false});
      }
    }
  }, [props.torchOn]);

  useEffect(() => {
    if (props.zoom != undefined) {
      DBR.setZoom({factor:props.zoom});
    }
  }, [props.zoom]);

  useEffect(() => {
    const selectCamera = async () => {
      if (props.cameraID != undefined && props.cameraID != "") {
        let result = await DBR.getSelectedCamera();
        if (result.selectedCamera) {
          if (result.selectedCamera == props.cameraID){
            return;
          }
        }
        DBR.selectCamera({cameraID:props.cameraID});
      }
    }
    selectCamera();
  }, [props.cameraID]);

  useEffect(() => {
    if (props.scanRegion != undefined) {
      DBR.setScanRegion(props.scanRegion);
    }
  }, [props.scanRegion]);

  useEffect(() => {
    if (props.resolution != undefined) {
      let res:number = Math.floor(props.resolution);
      DBR.setResolution({resolution:res});
    }
  }, [props.resolution]);

  return (
    <div></div>
  );

}
  
export default QRCodeScanner;