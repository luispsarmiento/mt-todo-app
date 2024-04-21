import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';

export const OVERLAY_DATA = new InjectionToken<any>('OverlayData');

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private overlayRef: any;

  constructor(private overlay: Overlay, private injector: Injector) { }

  open(component: any, data: any) {
    const overlayRef = this.createOverlay();
    const injectionTokens = new WeakMap();
    injectionTokens.set(OVERLAY_DATA, data);
    const customInjector = Injector.create({ parent: this.injector, providers: [{ provide: OVERLAY_DATA, useValue: data }] });

    const componentPortal = new ComponentPortal(component, null, customInjector);
    overlayRef.attach(componentPortal);
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  private createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      panelClass: ['custom-overlay-class'],
      backdropClass: 'custom-backdrop-class',
      positionStrategy: this.overlay.position().global().bottom().centerHorizontally()
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());
    return this.overlayRef;
  }
}
