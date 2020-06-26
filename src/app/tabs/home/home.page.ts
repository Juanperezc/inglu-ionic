import { Component, OnInit } from "@angular/core";
import { ClubPostService } from "src/app/services/ClubPostService.service";
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public posts = [];
  constructor(private clubPostService: ClubPostService,
    private navController: NavController) {}

  async ngOnInit() {
    await this.loadPost();
    // this.notificationService.getImgFromType()
  }

  async loadPost() {
    try {
      /*    await this.globalService.presentLoading(); */
      const postResponse: any = await this.clubPostService.index(9999);
      this.posts = postResponse.data;
      console.log('this.posts', this.posts);
      /*  await this.globalService.closeLoading();
       await this.globalService.saveToast(); */
    } catch (error) {
      console.error("error", error);
      /*    await this.globalService.closeLoading(); */
    }
  }

  goToPublication(id){
    this.navController.navigateForward(`/app/post-detail/${id}`);
  }
}
