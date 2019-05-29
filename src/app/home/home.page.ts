import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private barcodeScanner: BarcodeScanner, private camera: Camera, private qrScanner: QRScanner) {
  }
  barCode: any = '';
  qrCode: any = '';
  scanBarCode(): void {
   /* console.log('camera');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     alert(imageData);
     this.image = ( window as any ).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
     // Handle error
     alert('error ' + JSON.stringify(err));
    }); */

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.barCode = JSON.stringify(barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  scanQRCode(): void {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (true) {
        // camera permission was granted
        // start scanning
        const scanSub = this.qrScanner.scan().subscribe((qrCodeText: string) => {
          console.log('Scanned something', qrCodeText);
          this.qrCode = JSON.stringify(qrCodeText);
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });

      }
   })
   .catch((e: any) => console.log('Error is', e));
  }
}
