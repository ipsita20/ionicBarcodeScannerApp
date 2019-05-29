import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private barcodeScanner: BarcodeScanner, private camera: Camera) {
  }
  image: any = '';
  openCam(): void {
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
      this.image = barcodeData;
     }).catch(err => {
         console.log('Error', err);
     });

  }
}
