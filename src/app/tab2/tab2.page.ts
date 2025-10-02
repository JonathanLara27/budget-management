import { Component } from '@angular/core';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponentModule,
  ],
  standalone: true,
})
export class Tab2Page {

  constructor() {}

}
