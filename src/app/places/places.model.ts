export class Place {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public imageUrl: string,
    public price: number,
    public availableFrom: Date,
    public availableTo: Date
  ) {}
}
