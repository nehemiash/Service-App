import { Component, OnInit } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage implements OnInit {

  constructor(
    private videoPlayer: VideoPlayer
  ) {

  }

  ngOnInit() {
  }

  videoPlay() {
    this.videoPlayer.play('https://uns38w.bn.files.1drv.com/y4mZDIsHyFKPMo3NlzeTJP5fr7lMc6qo2iHn0pwyxbExY-TBKvBl1zVQ4J8s8G2zNpfIzE90_frcLLmwXdHxTG9PRy0nmBuQEJd4D7NXETfjHC9TQwLvdqJ7f26QeGnryhMkx0ghvV5rzL-SeqjxyE-ANVRFMVpcrmpU14Pv7HsCY2Tf2KNS_npy0jFU26GnJavOB5A6OWGfT5xc2ZQlOWIIt1HGoLRRe51LpA9C0dqMLU/MT15_720p.mp4?psid=1?').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }


}
