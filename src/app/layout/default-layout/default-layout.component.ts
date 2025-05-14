import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

import { NavItemsService } from '../../services/nav-items.service';
import { DefaultFooterComponent, DefaultHeaderComponent } from './';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent {
  constructor(private navItemsService: NavItemsService) {}

  public get navItems() {
    return this.navItemsService.getNavItems();
  }

  public get visibleNavItems() {
    const filteredNavItems = this.navItemsService.getNavItems().filter(item => !(item.attributes?.['hidden']));
    console.log('Filtered visibleNavItems:', filteredNavItems); // Debugging log
    return filteredNavItems;
  }
}
