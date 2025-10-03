import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ICONS_TABS } from '../common/constants';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage {

  private readonly authService = inject(AuthService);

  constructor() {
    addIcons(ICONS_TABS)
  }

  public async logout() {
    await this.authService.logout();
  }

}
