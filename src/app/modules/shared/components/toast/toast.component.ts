import { Component, Inject, OnInit } from '@angular/core';
import { OVERLAY_DATA, OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: []
})
export class ToastComponent implements OnInit {

  constructor(
    @Inject(OVERLAY_DATA) public data: any,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
  }

  close() {
    this.overlayService.close();
  }
}
