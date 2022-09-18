import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Youtube_videosService } from '../app/services/youtube_videos.service';
import { Videos } from '../models/videos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  AllVideos: Videos[] = [];
  constructor(
    private router: Router,
    private videoService: Youtube_videosService
  ) {}

  ngOnInit() {
    this.GetVideosBasedOnChannel();
  }

  /**
   * Developer : this function written by Omar salem
   * Purpose : this function responsible for retrieve a list of all videos based on choosed channel , by calling a function
   * calls youtube api
   * Params : there is no params to this function
   */
  ParsedVideos: any[] = [];
  GetVideosBasedOnChannel() {
    this.videoService.GetChannelVideos().subscribe((data: any) => {
      this.AllVideos = data.items;
      this.AllVideos.forEach((element: any) => {
        this.ParsedVideos.push({
          snippet: element.snippet,
          id: element.id,
        });
      });
    });
  }

  GotoDetails(ChoosedVideo: Videos) {
    this.router.navigateByUrl(`details/${ChoosedVideo.id.videoId}`);
  }
}
