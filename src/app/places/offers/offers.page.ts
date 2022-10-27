import { PlacesService } from './../places.service';
import { Component, OnInit } from '@angular/core';
import { Place } from '../places.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers: Place[];
  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.offers = this.placesService.places;
  }
  onEdit(offerId: number): void {}
  onDelete(offerId: number): void {}
}
