import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private toastController: ToastController
    ) {
    }

    alertMessage(message: string) {
        this.presentToastWithOptions(message);
    }

    notifyMessage(message: string) {
        this.presentToastWithOptions(message);
    }

    private async presentToastWithOptions(message: string, showClose = true) {
        // const text = 'OK';

        const toast = await this.toastController.create({
            message,
            duration: 5000,
            showCloseButton: showClose,
            position: 'top',
            // closeButtonText: text
        });
        await toast.present();
    }
}
