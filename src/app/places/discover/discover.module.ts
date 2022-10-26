import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DiscoverPageRoutingModule],
  declarations: [DiscoverPage, CreateBookingComponent],
})
export class DiscoverPageModule {}
