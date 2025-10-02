import { Component } from '@angular/core';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports : [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponentModule,
  ],
  standalone: true,
})
export class Tab1Page {

  constructor() {}

}
