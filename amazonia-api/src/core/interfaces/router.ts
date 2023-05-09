import { Application } from 'express';

export interface Router {
  init(application: Application): void;
}
