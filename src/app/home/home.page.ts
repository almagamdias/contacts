import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, NavController } from '@ionic/angular';
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
  constructor(private router: Router, private alertController: AlertController, private nav: NavController) { }
  
  ngOnInit() {
    this.load();
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async load() {
    const permission = await Contacts.requestPermissions();
    if (!permission?.contacts) return;
    else if (permission?.contacts == 'granted') {
      const result = await Contacts.getContacts({
        projection: {
          name: true,
          phones: true,
          emails: true
        }
      });
      this.contacts = result.contacts;
    }
  }
  join(array: any) {
    return array.map((x: { number: any; }) => x.number).join(' | ');
  }
  showDetail() {
    this.router.navigate(['second']);
  }
  showDetail2() {
    this.nav.navigateForward(['second']);
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
