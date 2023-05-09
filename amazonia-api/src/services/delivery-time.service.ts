import { DeliveryTimeData } from '../data/delivery-time.data';
import { DeliveryTimeRequest } from '../validation/delivery-time.schema';

export class DeliveryTimeService {
  private map: { [x: string]: Record<string, number> } = {};

  constructor(private readonly deliveryTimeData: DeliveryTimeData) {}

  getBetterRoute({
    start_on,
    object_location,
    delivery_on,
  }: DeliveryTimeRequest) {
    this.map = this.deliveryTimeData.getMap();

    const routeToGetObject = this.calculateBetterRoute(
      start_on,
      object_location
    );

    const routeToDelivery = this.calculateBetterRoute(
      object_location,
      delivery_on
    );

    return {
      path: routeToGetObject.path.concat(routeToDelivery.path.slice(1)),
      cost: routeToGetObject.cost + routeToDelivery.cost,
    };
  }

  private calculateBetterRoute(start: string, destiny: string) {
    const startIsGreaterThanDestiny = this.deliveryTimeData.greaterThan(
      start,
      destiny
    );

    if (startIsGreaterThanDestiny) {
      const tmpStart = start;
      start = destiny;
      destiny = tmpStart;
    }

    const result = this.findShortestPath(start, destiny);
    if (!result) {
      throw new Error(`Not found a route!`);
    }

    const { path, cost } = result;

    return { path: !startIsGreaterThanDestiny ? path : path.reverse(), cost };
  }

  private findShortestPath(start: string, destiny: string) {
    const concludedPaths: Array<{ cost: number; path: string[] }> = [];

    this.innerFindShortestPath(start, destiny, [start], 0, concludedPaths);

    return this.minorCost(concludedPaths);
  }

  private innerFindShortestPath(
    start: string,
    destiny: string,
    visited: string[],
    cost: number,
    concludedPaths: Array<{ cost: number }>
  ) {
    if (this.sameNode(start, destiny)) {
      concludedPaths.push(this.pathResult(visited, cost));
    } else {
      this.findInnerPaths(start, destiny, visited, cost, concludedPaths);
    }
  }

  private sameNode(a: string, b: string) {
    return a == b;
  }

  private findInnerPaths(
    start: string,
    destiny: string,
    visited: string[],
    cost: number,
    concludedPaths: Array<{ cost: number }>
  ) {
    const possiblePaths = this.map[start];
    const concludedPathsMinorCost = Math.min(
      ...concludedPaths.map(({ cost }) => cost)
    );

    let possibilityCount = 0;

    for (let possibilityProperty in possiblePaths) {
      if (possiblePaths.hasOwnProperty(possibilityProperty)) {
        if (visited.indexOf(possibilityProperty) == -1) {
          possibilityCount++;
          const newVisited = visited.concat(possibilityProperty);
          const newCost = cost + Number(possiblePaths[possibilityProperty]);

          if (
            concludedPathsMinorCost !== Infinity &&
            concludedPathsMinorCost < newCost
          ) {
            break;
          }

          this.innerFindShortestPath(
            possibilityProperty,
            destiny,
            newVisited,
            newCost,
            concludedPaths
          );
        }
      }
    }

    if (!possibilityCount) {
      concludedPaths.push(this.pathResult(visited, Infinity));
    }
  }

  private pathResult(path: string[], cost: number) {
    return {
      path: path,
      cost: cost,
    };
  }

  private minorCost(paths: Array<{ path: string[]; cost: number }>) {
    const minorCost = Math.min(...paths.map(({ cost }) => cost));

    return paths.find(({ cost }) => cost === minorCost);
  }
}
