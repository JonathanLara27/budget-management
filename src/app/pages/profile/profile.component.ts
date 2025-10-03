import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonButton, IonContent } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ICONS_PROFILE } from 'src/app/common/constants';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    IonContent, 
    CommonModule,
    IonButton,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent { 

  private authService = inject(AuthService);

  constructor() {
    addIcons(ICONS_PROFILE)
  }

  public async logout(){
    await this.authService.logout();
  }

}
