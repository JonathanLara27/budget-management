import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonIcon, IonLoading, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ICONS_PROFILE } from 'src/app/common/constants';
import { AuthService } from 'src/app/common/services/auth.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    IonContent, 
    IonButton,
    IonHeader,
    IonButton,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonLoading,
  ],
  providers: [
    ProfileService
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent { 

  private authService = inject(AuthService);

  private readonly profileService = inject(ProfileService);

  public title = this.profileService.title;

  constructor() {
    addIcons(ICONS_PROFILE)
  }

  public async logout(){
    await this.authService.logout();
  }

}
