import { Injectable } from '@angular/core';
import { OverlayService } from './overlay.service';
import { ToastComponent } from '../modules/shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private overlayService: OverlayService) { }

  success(message: string) {
    this.overlayService.open(ToastComponent, { message: message });
  }
}
