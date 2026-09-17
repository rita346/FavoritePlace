import * as SQLite from 'expo-sqlite';
import {Place} from "../models/place";

const database = SQLite.openDatabaseSync('places.db');

export function init() {
    return database.execAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )
    `);
}


export function insertPlace(place) {
    return database
        .runAsync(
            `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
            [
                place.title,
                place.imageUri,
                place.address,
                place.location.lat,
                place.location.lng,
            ]
        )
        .then((result) => {
            console.log(result);
            return result;
        });
}

export function fetchPlaces() {
    return database.getAllAsync('SELECT * FROM places').then((result) => {
       const places = [];
        for (const dp of result){
            places.push(new Place(dp.title,dp.imageUri,{
               address: dp.address,
               lat: dp.lat,
               lng: dp.lng,
            }, dp.id)
            );
        }
        return places;
    });
}

export function fetchPlaceDetails(id) {
    return database.getFirstAsync('SELECT * FROM places WHERE id = ?', [id]).then((dp) => {
        const place = new Place(dp.title, dp.imageUri, {
            address: dp.address,
            lat: dp.lat,
            lng: dp.lng,
        }, dp.id);
        return place;
    });
}