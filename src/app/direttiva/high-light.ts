import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]',
  standalone: false
})
export class HighLight {

  constructor(private element : ElementRef) {}
    @Input() appHighLight = '';

   @HostListener('mouseenter') onMouseEnter(){
      this.cambioColore(this.appHighLight);
    }
    @HostListener('mouseleave') onMouseLeave(){
      this.cambioColore("transparent");
    }    

    cambioColore(colore:string){
      this.element.nativeElement.style.backgroundColor = colore;
    }

}
