import React, { useState } from "react";

const HouseStructurePage = () => {
  const [houseStructure, setHouseStructure] = useState({
    format: "rectangular", // "rectangular" or "circular"
    floors: 3, // Number of floors
    roomsPerFloor: 4, // Number of rooms per floor
    costPerFloor: [100, 120, 150], // Costs for each floor
  });

  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (floor, room) => {
    setSelectedRoom({ floor, room });
  };

  const renderHouseStructure = () => {
    const { format, floors, roomsPerFloor, costPerFloor } = houseStructure;

    return (
      <div className="flex flex-col items-center space-y-4">
        {Array.from({ length: floors }, (_, floorIndex) => (
          <div
            key={floorIndex}
            className={`w-full max-w-lg ${
              format === "rectangular"
                ? "border border-gray-400"
                : "rounded-xl border border-blue-500"
            } p-4`}
          >
            <h3 className="text-center font-bold mb-2">
              Floor {floorIndex + 1} - ${costPerFloor[floorIndex]}
            </h3>
            <div
              className={`flex ${
                format === "rectangular"
                  ? "justify-between"
                  : "justify-around"
              }`}
            >
              {Array.from({ length: roomsPerFloor }, (_, roomIndex) => (
                <button
                  key={roomIndex}
                  className={`w-16 h-16 ${
                    format === "circular" ? "rounded-full" : "rounded-md"
                  } border ${
                    selectedRoom &&
                    selectedRoom.floor === floorIndex &&
                    selectedRoom.room === roomIndex
                      ? "bg-green-400 border-green-600"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                  } flex items-center justify-center`}
                  onClick={() => handleRoomClick(floorIndex, roomIndex)}
                >
                  {roomIndex + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">House Structure</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Selected Room:</h2>
        {selectedRoom ? (
          <p>
            Floor {selectedRoom.floor + 1}, Room {selectedRoom.room + 1}
          </p>
        ) : (
          <p>No room selected.</p>
        )}
      </div>
      <div className="border border-gray-700 rounded-lg bg-gray-50 p-6 shadow-lg">
        {renderHouseStructure()}
      </div>
    </div>
  );
};

export default HouseStructurePage;
