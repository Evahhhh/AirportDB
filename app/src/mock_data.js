var newDoc = {
  code_IATA: "CDG",
  nom: "Aéroport Charles de Gaulle",
  ville: "Paris",
  pays: "France",
  coordonnees_gps: {
    latitude: 49.009691,
    longitude: 2.547925,
  },
  vols: [
    {
      _id: "AF123",
      numero_vol: "AF123",
      heure_depart: new Date("2023-03-21T10:00:00Z"),
      heure_arrivee: new Date("2023-03-21T12:30:00Z"),
      aeroport_depart: {
        code_IATA: "CDG",
        nom: "Aéroport Charles de Gaulle",
        ville: "Paris",
        pays: "France",
        coordonnees_gps: {
          latitude: 49.009691,
          longitude: 2.547925,
        },
      },
      aeroport_arrivee: {
        code_IATA: "HUE",
        nom: "Aéroport Hue",
        ville: "Hue",
        pays: "Vietnam",
        coordonnees_gps: {
          latitude: 16.397733,
          longitude:  107.700131,
        },
      },
      avion: {
        modele: "Airbus A380",
        capacite: 853,
        compagnie_aerienne: "Vietnam airline",
      },
    },
  ],
};

var upDoc = {
  code_IATA: "ORL",
  nom: "Aéroport Orly",
  ville: "Paris",
  pays: "France",
  vols: [
    {
      numero_vol: "AF123",
      heure_depart: new Date("2023-03-21T10:00:00Z"),
      heure_arrivee: new Date("2023-03-21T12:30:00Z"),
      aeroport_depart: {
        code_IATA: "CDG",
        nom: "Aéroport Charles de Gaulle",
        ville: "Paris",
        pays: "France",
      },
      aeroport_arrivee: {
        code_IATA: "HUE",
        nom: "Aéroport Hue",
        ville: "Hue",
        pays: "Vietnam",
      },
      avion: {
        modele: "Airbus A380",
        capacite: 853,
        compagnie_aerienne: "Vietnam airline",
      },
    },
  ],
};

module.exports = { newDoc, upDoc };
