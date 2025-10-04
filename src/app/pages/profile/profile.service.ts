import { Injectable, computed, inject } from '@angular/core';
import { MEMBER_TEXT, PROFILE_TITLE, CONFIGURATION_TEXT, LOGOUT_TEXT } from './profile.constants';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ProfileService {

  private readonly authService = inject(AuthService);

  private router = inject(Router);

  public title = computed(() => PROFILE_TITLE);

  public menberText = computed(() => MEMBER_TEXT);

  public currentUser = this.authService.currentUser;

  public configurationText = computed(() => CONFIGURATION_TEXT);

  public logoutText = computed(() => LOGOUT_TEXT);

  constructor() { }

  public logout(){
    return this.authService.logout();
  }

  public async goToSettings() {
    await this.router.navigate(['/tabs/settings']);
  }

  public get formattedDate() {
    const date = this.currentUser()?.metadata?.creationTime || new Date;
    // const date2 = this.currentUser()?.createdAt?.toDate?() || new Date();
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }).format(new Date(date));
  }

}
