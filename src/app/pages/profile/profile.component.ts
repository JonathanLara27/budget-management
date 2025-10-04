import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonIcon, IonLoading, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ICONS_PROFILE } from 'src/app/common/constants';
import { AuthService } from 'src/app/common/services/auth.service';
import { ProfileService } from './profile.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    // IonContent, 
    // IonButton,
    // IonHeader,
    // IonButton,
    // IonIcon,
    // IonToolbar,
    // IonTitle,
    // IonLoading,
    IonicModule,
  ],
  providers: [
    ProfileService
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent { 

  private readonly profileService = inject(ProfileService);

  public title = this.profileService.title;

  public menberText = this.profileService.menberText;
  public configurationText = this.profileService.configurationText;
  public logoutText = this.profileService.logoutText;

  public currentUser = this.profileService.currentUser;

  public formattedDate = this.profileService.formattedDate;

  constructor() {
    addIcons(ICONS_PROFILE)
  }

  public logout(){
    return this.profileService.logout();
  }

  public goToSettings() {
    return this.profileService.goToSettings();
  }

}
