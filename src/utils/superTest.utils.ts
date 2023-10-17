import express, { Application } from "express";
import supertest from "supertest";

interface RouteFunction {
	(app: Application): void;
  }

/**
 * Creates a test server using the given route function and returns a supertest instance.
 *
 * @param {RouteFunction} route - The route function to be used by the server.
 * @return {supertest} - A supertest instance representing the test server.
 */
export function testServer(route:RouteFunction): supertest.SuperTest<supertest.Test> {
	const app:Application = express();
	app.use(express.json());
	route(app);
	return supertest(app);
}
