import { Component, OnInit } from '@angular/core';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Place } from '../places.model';
import { PlacesService } from './../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places: Place[];
  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.places = this.placesService.places;
  }
  onOpenMenu() {
    this.menuCtrl.toggle();
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>): void {
    console.log(event.detail?.value);
    if (event.detail?.value === 'all') {
      this.places = this.placesService.places.filter((x) => x.id > 0);
    } else {
      this.places = this.placesService.places.filter((x) => x.id > 3);
    }
  }
}
