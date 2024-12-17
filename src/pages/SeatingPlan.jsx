import React, { useState } from "react";
//import "./SeatingPlan.css";

function SeatingPlan() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [zoom, setZoom] = useState(1);

  // Sample seating layout
  const rows = 10;
  const columns = 10;
  const seats = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: columns }, (_, column) => ({
      row: row + 1,
      number: column + 1,
      status: Math.random() > 0.7 ? "reserved" : "available", // Random seat status
    }))
  );

  // Handle seat click
  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
  };

  // Handle zoom
  const handleZoom = (direction) => {
    setZoom((prevZoom) =>
      direction === "in" ? Math.min(prevZoom + 0.2, 2) : Math.max(prevZoom - 0.2, 0.5)
    );
  };

  return (
    <div className="seating-plan-container">
      <div className="controls">
        <button onClick={() => handleZoom("in")}>Zoom In</button>
        <button onClick={() => handleZoom("out")}>Zoom Out</button>
      </div>
      <div
        className="seating-plan"
        style={{ transform: `scale(${zoom})` }}
      >
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${seat.status}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.row}-{seat.number}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="seatingPlan-seat-details">
        {selectedSeat ? (
          <>
            <h3>Seat Details</h3>
            <p><strong>Row:</strong> {selectedSeat.row}</p>
            <p><strong>Number:</strong> {selectedSeat.number}</p>
            <p><strong>Status:</strong> {selectedSeat.status}</p>
          </>
        ) : (
          <p>Click on a seat to view details.</p>
        )}
      </div>
    </div>
  );
}

export default SeatingPlan;
