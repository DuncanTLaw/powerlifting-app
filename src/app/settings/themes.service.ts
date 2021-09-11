import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  renderer: Renderer2;

  constructor(private renderereFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = this.renderereFactory.createRenderer(null, null);
  }

  enableTheme(theme: string): void {
    this.renderer.addClass(this.document.body, theme);
  }

  disableTheme(theme: string) {
    this.renderer.removeClass(this.document.body, theme);
  }
}
