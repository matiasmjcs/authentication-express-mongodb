import { testServer } from "../src/utils/superTest.utils";
import { connect, disconnect } from "../src/database/databaseConnector.database";
import { hotelRouter } from "../src/router/hotel.route";
const request = testServer(hotelRouter);