import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  isSticky = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const pageHeader = document.getElementById("pageHeader");
    const stickyPoint = pageHeader?.offsetTop || 0;

    this.isSticky = window.pageYOffset > stickyPoint;
  }
}
