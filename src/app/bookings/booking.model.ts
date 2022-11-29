export class Booking {
  constructor(
    public id: number,
    public placeId: number,
    public userId: string,
    public placeTitle: string,
    public guestNumber: number,
    public placeImage: string,
    public firstName: string,
    public lastName: string,
    public bookedFrom: Date,
    public bookedTo: Date
  ) { }
}
