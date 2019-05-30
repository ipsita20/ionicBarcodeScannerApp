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
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
    if (status.authorized) {
      // camera permission was granted
       alert('authorized');
      // start scanning
       const scanSub = this.qrScanner.scan().subscribe((text: string) => {
        console.log('Scanned something', text);
        alert(text);
        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning
     //   this.navCtrl.pop();
      });
       this.startScanner();
       this.qrScanner.resumePreview();

      // show camera preview
       this.qrScanner.show()
      .then((data: QRScannerStatus) => {
        console.log('datashowing', data.showing);
        alert(data.showing);
      }, err => {
        alert(err);

      });

      // wait for user to scan something, then the observable callback will be called

    } else if (status.denied) {
      alert('denied');
      // camera permission was permanently denied
      // you must use QRScanner.openSettings() method to guide the user to the settings page
      // then they can grant the permission from there
    } else {
      // permission was denied, but not permanently. You can ask for permission again at a later time.
      alert('else');
    }
  })
  .catch((e: any) => {
    alert('Error is' + e);
  });
  }

  startScanner() {
    const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
            rootElement.classList.add('qr-scanner-open');
  }

  closeScanner() {
    const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
            rootElement.classList.remove('qr-scanner-open');
}
}
