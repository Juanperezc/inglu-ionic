import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
/* import Swal from 'sweetalert2';
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public loading: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  private ionicLoading: any;
  constructor(public loadingController: LoadingController,
    private toastController: ToastController) {
  }
/*   async AlertDelete(){
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    return result;
  } */
  setLoading(boolean: Boolean){
    this.loading.next(boolean);
  }

  async saveToast(text: string = "Se guardaron correctamente los cambios.") {
    const toast = await this.toastController.create({
      message: text,
      color: "success",
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(text = "Cargando..") {
    this.ionicLoading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: text,
     /*  translucent: true, */
      showBackdrop: true,
    });
    await this.ionicLoading.present();
  }
  async closeLoading(){
   /*  console.log('ionicLoading',this.ionicLoading); */
   if (this.ionicLoading){
    await this.ionicLoading.dismiss();
   }
  }

  momentDate(date: any, format="YYYY-MM-DD HH:mm"){
    return moment.utc(date, format).lang("es").local().format("DD-MM-YYYY HH:mm");
   }
 
   momentTimeAgo(date: any, format="YYYY-MM-DD HH:mm"){
   return moment.utc(date, format).lang("es").local().fromNow();
  }

}
