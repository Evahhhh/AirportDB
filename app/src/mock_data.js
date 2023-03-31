var newDoc = {
  code_IATA: "PHU",
  nom: "Aéroport de Phù Bài",
  ville: "Phu Bai",
  pays: "Vietnam",
  location: {
    type: "Point",
    coordinates: [
      107.7003438,
      16.3979097
    ]
  },
  vols: [
    {
      numero_vol: "FET24",
      heure_depart: "2023-03-31T19:56",
      heure_arrivee: "2023-04-02T19:56",
      aeroport_depart: {
        code_IATA: "PHU",
        nom: "Aéroport de Phù Bài",
        ville: "Phu Bai",
        pays: "Vietnam"
      },
      aeroport_arrivee: {
        code_IATA: "HUE",
        nom: "Aéroport de Hue",
        ville: "Hue",
        pays: "Vietnam"
      },
      avion: {
        modele: "Boeing N65",
        capacite: "450",
        compagnie_aerienne: "Air France"
      }
    },
    {
      numero_vol: "AF114",
      heure_depart: "2023-03-11T20:58",
      heure_arrivee: "2023-04-01T19:58",
      aeroport_depart: {
        code_IATA: "CDG",
        nom: "Aéroport de Charles de Gaulle",
        ville: "Paris",
        pays: "France"
      },
      aeroport_arrivee: {
        code_IATA: "PHU",
        nom: "Aéroport de Phù Bài",
        ville: "Phu Bai",
        pays: "Vietnam"
      },
      avion: {
        modele: "Airbus A380",
        capacite: "340",
        compagnie_aerienne: "Air France"
      }
    },
    {
      numero_vol: "Vol KRKRKRqsd",
      heure_depart: "2023-03-11T20:58",
      heure_arrivee: "2023-04-01T19:58",
      aeroport_depart: {
        code_IATA: "CDG",
        nom: "Aéroport de Charles de Gaulle",
        ville: "Paris",
        pays: "France"
      },
      aeroport_arrivee: {
        code_IATA: "PHU",
        nom : "Aéroport de Phù Bài",
        ville: "Phu Bai",
        pays: "Vietnam"
      },
      avion: {
        modele: "Boeing 737",
        capacite: "400",
        compagnie_aerienne: "Vietnam Airlines"
      }
    }
  ]
}

var upDoc = {
  code_IATA: "LBG",
  nom: "Aéroport de Paris-Le Bourget",
  ville: "Paris",
  pays: "France",
  location: {
    type: "Point",
    coordinates: [
      2.3522219,
      48.856614
    ]
  },
  vols: []
}

module.exports = { newDoc, upDoc };
