import { testServer } from "../src/utils/superTest.utils";
import { userRouter } from "../src/router/user.route";
import { connect, disconnect } from "../src/database/databaseConnector.database";
const request = testServer(userRouter);

const usuario = {
  username: "usuariofalse",
  email: "usuariofalse@example.com",
  password: "strongPassword123"
}

let userId: string;

describe("[ routes / api/v1/user ]", () => {
  beforeAll(async () => {
    connect()
  })
  afterAll(async () => {
    await disconnect()
  });
  it("should return a 201 Created status code when a new user successfully signs up", async () => {
    // Arrange
    const expectedStatus = 201;

    // Act
    const { status: result, body } = await request
      .post("/api/v1/user/signup")
      .send({
        username: usuario.username,
        email: usuario.email,
        password: usuario.password
      });
      userId = body.user._id

    // Assert
    expect(result).toEqual(expectedStatus);
  });
  it("should return a 200 OK status code when a user logs in with valid credentials", async () => {
    // Arrange
    const expectedSuccess = 200;
    const expectedErrorEmpty = 400;
    const expectedErrorAuthentication = 401;

    // Act
    const { status: result } = await request
      .post("/api/v1/user/login")
      .send({
        email: usuario.email,
        password: usuario.password
      })

      const { status: resultErrorEmpty } = await request
      .post("/api/v1/user/login")

      const { status: resultErrorAuthentication } = await request
      .post("/api/v1/user/login")
      .send({
        email: usuario.email,
        password: "strongPassword123333"
      })

    // Assert
    expect(result).toEqual(expectedSuccess);
    expect(expectedErrorEmpty).toEqual(resultErrorEmpty);
    expect(expectedErrorAuthentication).toEqual(resultErrorAuthentication);
  });


  it("should return a 204 No Content status code when a user logs out", async () => {
    // Arrange
    const expectedStatus = 204;

    // Act
    const { status: result } = await request
      .post("/api/v1/user/logout");
    // Assert
    expect(result).toEqual(expectedStatus);

  });
  it("should return a 200 OK status code when deleting a user", async () => {
    // Arrange
    const expectedStatus = 200;
  
    // Act
    const { status: result } = await request
      .delete(`/api/v1/user/delete/${userId}`);
  
    // Assert
    expect(result).toEqual(expectedStatus);
  });
  
});