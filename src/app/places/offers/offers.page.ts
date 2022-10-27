import { Router } from '@angular/router';
import { PlacesService } from './../places.service';
import { Component, OnInit } from '@angular/core';
import { Place } from '../places.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers: Place[];
  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    this.offers = this.placesService.places;
  }
  onEdit(offerId: number, slidingItem: IonItemSliding): void {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }
  onDelete(offerId: number): void {}
}
