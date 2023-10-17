import { testServer } from "../src/utils/superTest.utils";
import { connect, disconnect } from "../src/database/databaseConnector.database";
import { hotelRouter } from "../src/router/hotel.route";
import { categoryRouter } from "../src/router/category.route";
const request = testServer(hotelRouter);
const requestcategory = testServer(categoryRouter);

const luxuryHotel = {
    name: "The Royal Oasis",
    description: "An oasis of luxury and comfort in the heart of Miami. Enjoy an unforgettable experience at our 5-star luxury hotel with exceptional service and top-notch facilities.",
    location: "123 Ocean Drive, Miami, Florida, USA",
    contact: "Phone: +1 (123) 456-7890 | Email: info@royaloasishotel.com"
};

const luxuryHotelUpdated = {
    name: "the new royal oasis",
    location: "562 Ocean Drive, Miami, Florida, USA",    
}

let luxuryHotelId: string;

describe("[ routes / api/v1/hotel ]", () => {
    beforeAll(async () => {
       await connect()
    })
    afterAll(async () => {
        await disconnect()
    })
    it("should return a 201 Created status code when a new hotel successfully creates", async () => {
        // Arrange
        const expectedStatus = 201;
        const {body: bodyCategory} = await requestcategory.get("/api/v1/category")
        const categories = bodyCategory.categories
        const response = await request.post("/api/v1/hotel").send({
            name: luxuryHotel.name,
            description: luxuryHotel.description,
            location: luxuryHotel.location,
            contact: luxuryHotel.contact,
            category: categories[0]._id
        })
        const {body, status} = response
        luxuryHotelId = body.response._id
        expect(status).toEqual(expectedStatus)
    })
    it("should return a 200 OK status code when a hotel is found by its ID", async () => {
        // Arrange
        const expectedStatus = 200;
        const { status: result} = await request.get(`/api/v1/hotel/${luxuryHotelId}`)
        expect(result).toEqual(expectedStatus)
    })
    it("should return a 200 OK status code when find all hotels", async () => {
        // Arrange
        const expectedStatus = 200;
        const { status: result} = await request.get(`/api/v1/hotel`)
        expect(result).toEqual(expectedStatus)
    })
    it("should return a 204 No Content status code when a hotel is updated", async () => {
        // Arrange
        const expectedStatus = 200;
        const { status: result} = await request.patch(`/api/v1/hotel/${luxuryHotelId}`).send({
            name: luxuryHotelUpdated.name,
            location: luxuryHotelUpdated.location,
        })
        expect(result).toEqual(expectedStatus)
    })
    it("should return a 204 No Content status code when a hotel is deleted", async () => {
        // Arrange
        const expectedStatus = 200;
        const { status: result} = await request.delete(`/api/v1/hotel/${luxuryHotelId}`)
        expect(result).toEqual(expectedStatus)
    })
})