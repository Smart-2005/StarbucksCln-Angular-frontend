import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-explore-us',
  templateUrl: './explore-us.component.html',
  styleUrls: ['./explore-us.component.scss']
})
export class ExploreUsComponent {
  isSticky = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const pageHeader = document.getElementById("pageHeader");
    const stickyPoint = pageHeader?.offsetTop || 0;

    this.isSticky = window.pageYOffset > stickyPoint;
  }
}
