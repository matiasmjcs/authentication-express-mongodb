import { testServer } from "../src/utils/superTest.utils";
import { connect, disconnect } from "../src/database/databaseConnector.database";
import { roomRouter } from "../src/router/room.route";
import { hotelRouter } from "../src/router/hotel.route";
const request = testServer(roomRouter);
const requesthotel = testServer(hotelRouter);

const fictitiousRoom = {
    roomNumber: "101",
    roomType: "Luxury Suite",
    pricePerNight: 300,
    description: "An elegant luxury suite with panoramic views and all the amenities for an unforgettable stay.",
    images: [
        "image1.jpg",
        "image2.jpg",
        "image3.jpg"
    ],
    availableDates: [
        new Date("2023-11-01"),
        new Date("2023-11-15"),
        new Date("2023-12-10")
    ],
    amenities: [
        "King Size Bed",
        "Marble Bathroom",
        "Minibar",
        "Flat-screen TV",
        "High-speed Wi-Fi"
    ],
    capacity: 2,
    isClean: true
};

let fictitiousRoomId: string;

describe("[ routes / api/v1/room ]", () => {
    beforeAll(async () => {
       await connect()
    })
    afterAll(async () => {
        await disconnect()
    })
    it("should return a 201 Created status code when a new room successfully creates", async () => {
        // Arrange
        const expectedStatus = 201;
        const {body: bodyHotel} = await requesthotel.get("/api/v1/hotel")
        const { status: result, body} = await request.post("/api/v1/room").send({
            roomNumber: fictitiousRoom.roomNumber,
            roomType: fictitiousRoom.roomType,
            pricePerNight: fictitiousRoom.pricePerNight,
            description: fictitiousRoom.description,
            images: fictitiousRoom.images,
            availableDates: fictitiousRoom.availableDates,
            amenities: fictitiousRoom.amenities,
            capacity: fictitiousRoom.capacity,
            isClean: fictitiousRoom.isClean,
            hotel: bodyHotel.hotels[0]._id
        })
        fictitiousRoomId = body.response._id
        expect(result).toEqual(expectedStatus)
    })
    it("should return a 200 OK status code when a room is found by its ID", async () => {
        // Arrange
        const expectedStatus = 200;
        const { status: result} = await request.get(`/api/v1/room/${fictitiousRoomId}`)
        expect(result).toEqual(expectedStatus)
    })
    it("should return a 200 OK status code when find all rooms", async () => {
        // Arrange
        const expectedStatus = 200;
        const { status: result} = await request.get(`/api/v1/room`)
        expect(result).toEqual(expectedStatus)
    })
    it("should return a 204 No Content status code when a room is updated", async () => {
        // Arrange
        const expectedStatus = 200;
        const { status: result} = await request.patch(`/api/v1/room/${fictitiousRoomId}`).send({
            roomNumber: "506",
            capacity: 8,
            isClean: false,
        })
        expect(result).toEqual(expectedStatus)
    })
    it("should return a 204 No Content status code when a room is deleted", async () => {
        // Arrange
        const expectedStatus = 200;
        const { status: result} = await request.delete(`/api/v1/room/${fictitiousRoomId}`)
        expect(result).toEqual(expectedStatus)
    })
})