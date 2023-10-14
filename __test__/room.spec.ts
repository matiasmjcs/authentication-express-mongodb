import { testServer } from "../src/utils/superTest.utils";
import { connect, disconnect } from "../src/database/databaseConnector.database";
import { roomRouter } from "../src/router/room.route";
const request = testServer(roomRouter);