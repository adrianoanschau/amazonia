import Joi from 'joi';
import { horizontalLocations, verticalLocations } from '../core/constants';

export type DeliveryTimeRequest = {
  start_on: string;
  object_location: string;
  delivery_on: string;
};

const locationValues = horizontalLocations
  .map((h) => verticalLocations.map((v) => `${h}${v}`))
  .flat();

export const deliveryTimeSchema = Joi.object<DeliveryTimeRequest>({
  start_on: Joi.string()
    .valid(...locationValues)
    .required(),
  object_location: Joi.string()
    .valid(...locationValues)
    .required(),
  delivery_on: Joi.string()
    .valid(...locationValues)
    .required(),
});
