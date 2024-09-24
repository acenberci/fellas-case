const mongoose = require("mongoose");

const FlightsSchema = new mongoose.Schema({
  lastUpdatedAt: {
    type: Date
  },
  aircraftRegistration: {
    type: String
  },
  aircraftType: {
    iataMain: {
      type: String
    },
    iataSub: {
      type: String
    }
  },
  checkinAllocations: {
    checkinAllocations: [{
      endTime: {
        type: Date
      },
      rows: {
        rows: [{
          position: {
            type: String,
          },
          desks: {
            desks: [{
              position: {
                type: Number,
                required: true
              }
            }]
          }
        }]
      },
      startTime: {
        type: Date
      }
    }]
  },
  codeshares: {
    codeshares: {
      type: [String]
    }
  },
  flightDirection: {
    type: String
  },
  flightName: {
    type: String
  },
  flightNumber: {
    type: Number
  },
  id: {
    type: String,
    required: true
  },
  isOperationalFlight: {
    type: Boolean
  },
  mainFlight: {
    type: String
  },
  prefixIATA: {
    type: String
  },
  prefixICAO: {
    type: String
  },
  airlineCode: {
    type: Number
  },
  publicFlightState: {
    flightStates: {
      type: [String]
    }
  },
  route: {
    destinations: {
      type: [String]
    },
    eu: {
      type: String
    },
    visa: {
      type: Boolean
    }
  },
  scheduleDateTime: {
    type: Date
  },
  scheduleDate: {
    type: String
  },
  scheduleTime: {
    type: String
  },
  serviceType: {
    type: String // Örnek: "J" yolcu, "C" kargo
  },
  terminal: {
    type: Number
  },
  schemaVersion: {
    type: String
  },
  departureAirport: {
      type: String
  },
  landingTime: {
    type: Date
  },
  price: {
    type: Number
  }
});

const Flights = mongoose.model("Flights", FlightsSchema);
module.exports = Flights;
