import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Contacts, ContactsPlugin, ContactPayload, PhoneType } from '@capacitor-community/contacts';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isSupported = false;
  barcodes: Barcode[] = [];
  contacts: any[] = [];
  permissions: any;
  constructor(private alertController: AlertController) { }
  
  ngOnInit() {
    this.load();
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async load() {
    const permission = await Contacts.requestPermissions();
    console.log('Permission: ', permission.contacts);
    if (!permission?.contacts) return;
    else if (permission?.contacts == 'granted') {
      const result = await Contacts.getContacts({
        projection: {
          name: true,
          phones: true,
          emails: true
        }
      });
      console.log('Res: ', result);
      this.contacts = result.contacts;
      console.log(this.contacts);
    }
  }
  join(array: any) {
    return array.map((x: { number: any; }) => x.number).join(' | ');
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.pop();
    this.barcodes.push(...barcodes);
    const alert = await this.alertController.create({
      header: barcodes[0].format,
      message: barcodes[0].rawValue.toString(),
      buttons: ['OK'],
    });
    await alert.present();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
