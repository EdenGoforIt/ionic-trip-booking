import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/places/places.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.selectedPlace);
  }
  onCancel() {
    // when multiple modals open, use Id
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onBookPlace(): void {
    this.modalCtrl.dismiss({ data: this.selectedPlace }, 'onBookPlace');
  }
}
