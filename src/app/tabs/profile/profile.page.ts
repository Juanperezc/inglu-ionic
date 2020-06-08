import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService.service';
import { UserStorage } from 'src/app/services/storage/UserStorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { FileService } from 'src/app/services/FileService.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit{
  private loading: boolean;
  private user : any;
  private profileForm : FormGroup;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private fileService: FileService,
    private navController: NavController
  ) {
   
  }
    goToSettings(){
      this.navController.navigateForward("/app/settings");
    }
    async ngOnInit(){
      this.user = await UserStorage.getUser();
      await this.loadProfile();
      await this.initForm();
    }
    async initForm(){
      this.profileForm = this.formBuilder.group({
        name: [this.user ?  this.user.name : '',Validators.required],
        profile_pic: [this.user ?  this.user.profile_pic : null],
        last_name: [this.user ?  this.user.last_name : '', Validators.required],
        id_card: [this.user ?  this.user.id_card : '', Validators.required],
        gender: [this.user ?  this.user.gender : '', Validators.required],
        email: [this.user ?  this.user.email : '', Validators.required],
        date_of_birth: [this.user ?  this.user.date_of_birth : '', Validators.required],
        address: [this.user ?  this.user.address : '', Validators.required],
        phone: [this.user ?  this.user.phone : '', Validators.required],
      });
    }
    async loadProfile(){
   
    try {
      this.loading = true;
      const userResponse: any = await this.userService.me();
      console.log('userData',userResponse.data);
      this.user = userResponse.data;
     
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }
  async onSave(){
    if (this.profileForm.valid){
      try {
        const data = this.profileForm.value;
       await this.globalService.presentLoading();
       const userResponse: any = await this.userService.update(this.user.id, data)
       this.user = userResponse.data;
       await UserStorage.setUser(userResponse.data);
       await this.globalService.closeLoading();
       await this.globalService.saveToast();
      } catch (error) {
        await this.globalService.closeLoading();
      }
    }

  }

  async onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    console.log(file);
   /*  let reader: FileReader = new FileReader(); */
    try {
      await this.globalService.presentLoading();
    console.log('test');
    const service: any = await this.fileService.upload_file(file,"image/profile");
    console.log(service);
    await this.globalService.closeLoading();

  /*   this.currentPhoto = service.urlFinal; */
    this.profileForm.controls['profile_pic'].setValue(service.urlFinal);

    } catch (error) {
      console.error('error', error);
      await this.globalService.closeLoading();
    }
  }
}
