import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/UserService.service";
import { UserStorage } from "src/app/services/storage/UserStorage.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GlobalService } from "src/app/services/global.service";
import { FileService } from "src/app/services/FileService.service";
import { NavController, PopoverController } from "@ionic/angular";
import { LogoutComponent } from "src/app/components/logout/logout.component";
import { ImagePicker } from "@ionic-native/image-picker/ngx";

@Component({
  selector: "app-profile",
  templateUrl: "profile.page.html",
  styleUrls: ["profile.page.scss"],
})
export class ProfilePage implements OnInit {
  public loading: boolean;
  public user: any;
  public profileForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private fileService: FileService,
    private navController: NavController,
    private popoverController: PopoverController,
    private imagePicker: ImagePicker
  ) {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LogoutComponent,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  goCamera(){
    const options = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 100,
      outputType: 1 //Set output type to 1 to get base64img
  };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        if (results[i]){
          this.onFileChanged(results[i]);
          console.log('Image URI: ' + results[i]);
        }
        

      }
    }, (err) => { console.error('error',err) });
  }

  goToSettings() {
    this.navController.navigateForward("/app/settings");
  }

  ngOnInit(){

  }

  async ionViewDidEnter() {
    this.user = await UserStorage.getUser();
    await this.loadProfile();
    await this.initForm();
  }

  genderToSpanish(gender){
    switch(gender){
      case "male": {
        return "Masculino"
      }
      case "female": 
      return "Femenino"
    }
  }

  genderToEnglish(gender){
    switch(gender){
      case "Masculino": {
        return "male"
      }
      case "Femenino": 
      return "female"
    }
  }
  async initForm() {
    this.profileForm = this.formBuilder.group({
      name: [this.user ? this.user.name : "", Validators.required],
      profile_pic: [this.user ? this.user.profile_pic : null],
      last_name: [this.user ? this.user.last_name : "", Validators.required],
      id_card: [this.user ? this.user.id_card : "", Validators.required],
      gender: [this.user ? this.genderToSpanish(this.user.gender) : "", Validators.required],
      email: [this.user ? this.user.email : "", Validators.required],
      date_of_birth: [
        this.user ? this.user.date_of_birth : "",
        Validators.required,
      ],
      address: [this.user ? this.user.address : "", Validators.required],
      phone: [this.user ? this.user.phone : "", Validators.required],
    });
  }
  async loadProfile() {
    try {
      this.loading = true;
      const userResponse: any = await this.userService.me();
      console.log("userData", userResponse.data);
      this.user = userResponse.data;

      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }
  async onSave() {
    if (this.profileForm.valid) {
      try {
        let data = this.profileForm.value;
        data.gender = this.genderToEnglish(data.gender);
        await this.globalService.presentLoading();
        const userResponse: any = await this.userService.update(
          this.user.id,
          data
        );
        this.user = userResponse.data;
        await UserStorage.setUser(userResponse.data);
        await this.globalService.closeLoading();
        await this.globalService.saveToast();
      } catch (error) {
        await this.globalService.closeLoading();
      }
    }
  }

  async onFileChanged(file_url: any) {
    let blob = this.getBlob(file_url, ".jpg")
    const fileBlob = new File([blob], "image.jpg")
    let file: File = fileBlob;
    console.log(file);
    /*  let reader: FileReader = new FileReader(); */
    try {
      await this.globalService.presentLoading();
      console.log("test");
      const service: any = await this.fileService.upload_file(
        file,
        "image/profile"
      );
      console.log(service);
      await this.globalService.closeLoading();

      /*   this.currentPhoto = service.urlFinal; */
      this.profileForm.controls["profile_pic"].setValue(service.urlFinal);
      this.onSave();
    } catch (error) {
      console.error("error", error);
      await this.globalService.closeLoading();
    }
  }

  private getBlob(b64Data:string, contentType:string, sliceSize:number= 512) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
}
