import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
/* import { Router } from '@angular/router'; */
/* import { ToastrService } from 'ngx-toastr'; */
import { ToastController } from '@ionic/angular';

import { UserStorage } from '../storage/UserStorage.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private navController: NavController,
    public toastController: ToastController
  /*   private toastr: ToastrService */
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
   
  }
  async handle(req: HttpRequest<any>, next: HttpHandler){
    const token: string = await UserStorage.getToken();

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError( (err: HttpErrorResponse) => {
        console.log('error err', err);
        if (err.status === 401) {
          this.navController.navigateRoot('/login')
         /*  this.router.navigateByUrl('/public/sign-in'); */
        }
        if (err.status === 403) {
          const error = err.error && err.error.message ? err.error.message : null;
          switch(error){
            case "Account Disabled": {
             this.toastController.create({
                message: 'Cuenta deshabilitada.',
                duration: 2000,
                color: "danger"
              }).then((toast) =>  toast.present());
           
           
             /*  this.toastr.error("Cuenta deshabilitada", "Error") */
              break;
            }
            case "Unauthorized" : {
               this.toastController.create({
                message: 'Usuario/Contraseña incorrecta.',
                duration: 2000,
                color: "danger"
              }).then((toast) =>  toast.present());
              /* this.toastr.error("Usuario/Contraseña incorrecta", "Error") */
              break;
            }
          }
        }
        if (err.status === 422) {
          console.log('error err', err);
          const errors = err.error && err.error.errors ? err.error.errors : null;
          if (errors){
            const keys = Object.keys(errors);
            let errors_string = "";
          keys.forEach((property, key) => {
            errors[property].forEach((value, key) => {
              errors_string += value + " "
           /*    this.toastr.error(value, "Error") */
            /*   this.$bvToast.toast(value, {
                title: "Error",
                autoHideDelay: 3000,
                variant: "danger",
                appendToast: false
              }); */
            });
          
          });
          this.toastController.create({
            message: errors_string,
            duration: 5000,
            color: "danger"
          }).then((toast) =>  toast.present());          }
          
         
        }
        if (err.status === 500) {
          const error = err.error && err.error.message ? err.error.message : null;
        /*   this.toastr.error(error, "Error"); */

        }
        return throwError( err );

      })
    ).toPromise();
  }
}