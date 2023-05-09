import { HttpClient } from '../core/http-client';

type TimesData = Record<string, Record<string, number>>;

export class DeliveryTimeData {
  /* STORE DELIVERY TIMES DATA REFERENCE */
  private times: TimesData = {};

  /* THE FREQUENCY FOR UPDATE DELIVERY TIMES DATA REFERENCE */
  /* IN SECONDS */
  private deliveryTimesUpdateFrequency: number;

  constructor(private httpClient: HttpClient) {
    const minimumFrequency = 30 * 1000;
    const deliveryTimesUpdateFrequency = parseInt(
      process.env.DELIVERY_TIMES_UPDATE_FREQUENCY || `${minimumFrequency}`,
      10
    );

    if (deliveryTimesUpdateFrequency < minimumFrequency) {
      this.deliveryTimesUpdateFrequency = minimumFrequency;
      return;
    }

    this.deliveryTimesUpdateFrequency = deliveryTimesUpdateFrequency;
  }

  public init() {
    return this.refresh();
  }

  private async refresh() {
    try {
      const { data } = await this.httpClient.get(
        '/10404696-fd43-4481-a7ed-f9369073252f'
      );

      this.times = data;

      // SCHEDULE THE NEXT UPDATE
      setTimeout(() => {
        this.refresh();
      }, this.deliveryTimesUpdateFrequency);
    } catch (error) {
      throw new Error(`Error on try update delivery times`);
    }
  }

  getDeliveryTime(from: string, to: string) {
    if (this.times[from] === undefined)
      throw new Error(`Don't exists location: ${from}`);

    if (this.times[from][to] === undefined)
      throw new Error(`Don't move ${from} to ${to}`);

    return this.times[from][to];
  }
}
