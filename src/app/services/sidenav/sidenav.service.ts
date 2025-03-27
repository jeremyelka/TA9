import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  isSidenavOpen = signal(false);

  toggleSidenav() {
    this.isSidenavOpen.update((isOpen) => !isOpen);
  }

  openSidenav() {
    this.isSidenavOpen.set(true);
  }

  closeSidenav() {
    this.isSidenavOpen.set(false);
  }
}