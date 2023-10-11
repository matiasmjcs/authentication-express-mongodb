
export const FindRoomAll = async () => {
    try {
        return "FindRoomAll"
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: FindRoomAll Internal server error" + error,
        };
    }
}

export const FindRoomById = async (id: string) => {
    try {
     return "FindRoomById"
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: FindRoomById Internal server error" + error,
        };
    }
}

export const createRoom = async (hotel: any) => {
    try {
        return "createRoom"
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: createRoom Internal server error" + error,
        };
    }
}

export const updateRoom = async (id: string, updatedData:any) => {
    try {
        return "updateRoom"
    } catch (error) {
        return {
            success: false,
            error: "DatabaseManager: updateRoom Internal server error" + error,
        };
    }
}
