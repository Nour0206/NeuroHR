import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { BehaviorSubject } from 'rxjs';
import { navItems as defaultNavItems } from '../layout/default-layout/_nav';

@Injectable({
  providedIn: 'root',
})
export class NavItemsService {
  private navItemsSubject = new BehaviorSubject<INavData[]>([...defaultNavItems]);
  navItems$ = this.navItemsSubject.asObservable();

  updateNavItems(newNavItems: INavData[]): void {
    this.navItemsSubject.next(newNavItems);
  }

  getNavItems(): INavData[] {
    return this.navItemsSubject.getValue();
  }
}
