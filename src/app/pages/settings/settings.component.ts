import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsService } from './settings.service';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ICONS_SETTINGS } from 'src/app/common/constants';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
  providers: [SettingsService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent { 

  constructor(){
    addIcons(ICONS_SETTINGS);
  }

}
