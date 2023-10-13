import express, { Application, Router } from "express";
import supertest from "supertest";

interface RouteFunction {
	(app: Application): void;
  }

export function testServer(route:RouteFunction) {
	const app:Application = express();
	app.use(express.json());
	route(app);
	return supertest(app);
}
