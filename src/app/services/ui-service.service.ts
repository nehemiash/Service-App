import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController

  ) { }

  async mostrarAlerta(header: string, message: string) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: 'Ok',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();

    });
  }

  async mostrarToast(message: string, color: string) {
    message = message.toLocaleUpperCase();
    let icon: string;
    if (color === 'success') {
      icon = 'checkmark';
    }
    if (color === 'danger') {
      icon = 'warning';
    }
    const toast = await this.toastController.create({
      message,
      color,
      position: 'top',
      mode: 'md',
      cssClass: 'customToastClass',
      duration: 5000,
      animated: true,
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }, {
        side: 'start',
        icon,
      }],
    });
    toast.present();
  }


}
