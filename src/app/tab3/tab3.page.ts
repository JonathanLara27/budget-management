import { Component } from '@angular/core';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  imports: [
    ExploreContainerComponentModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ],
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
})
export class Tab3Page {

  constructor() {}

}
