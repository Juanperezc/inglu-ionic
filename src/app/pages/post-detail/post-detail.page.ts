import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClubPostService } from "src/app/services/ClubPostService.service";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.page.html",
  styleUrls: ["./post-detail.page.scss"],
})
export class PostDetailPage implements OnInit {
  id: any;
  public p = null;
  constructor(
    private route: ActivatedRoute,
    private clubPostService: ClubPostService,
    private globalService: GlobalService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.id = params["id"];
      console.log("this.id", this.id);
      await this.loadPost(this.id);
    });
  }

  async loadPost(id: any) {
    try {
      await this.globalService.presentLoading();
      const postResponse: any = await this.clubPostService.show(id);
      this.p = postResponse.data;
      console.log("this.posts", this.p);
      await this.globalService.closeLoading();
    } catch (error) {
      console.error("error", error);
      await this.globalService.closeLoading();
    }
  }

  getMomentFrom(time: any){
    return this.globalService.momentTimeAgo(time, "DD-MM-YYYY HH:mm");
  }
}
