import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Youtube_videosService } from 'src/app/services/youtube_videos.service';
import { VideoDetails, VideoInfo } from '../models/videos';
@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css'],
})
export class VideoDetailsComponent implements OnInit {
  Video_id!: string;
  ChoosedVideo: VideoDetails = {} as VideoDetails;
  videoInfo = {} as VideoInfo;
  constructor(
    private videoService: Youtube_videosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.GetVideoDetails();
  }

  /**
   * Developer : Omar Salem
   * Function name : GetVideoDetails
   * Function parameter : this function takes choosed video id as a parameter
   * Purpose : this function get all specific data for choosed video based on video id
   */
  GetVideoDetails() {
    this.route.params.subscribe((data) => {
      this.Video_id = data.id;
    });
    this.videoService
      .GetVideoRating(this.Video_id)
      .subscribe((videoDetails: VideoDetails) => {
        this.ChoosedVideo = videoDetails;
        this.videoInfo = this.ChoosedVideo.items[0];
        console.log(this.videoInfo);
      });
  }
}
