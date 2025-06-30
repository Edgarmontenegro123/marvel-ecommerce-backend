import Favourite from '../models/favourite.js';

export default class FavouriteService {
    async addFavourite({userId, marvelId, type, name, thumbnail}) {
        return Favourite.create({userId, marvelId, type, name, thumbnail});
    }

    async getFavouritesByUser(userId) {
        return Favourite.findAllByUser(userId);
    }

    async removeFavourite({userId, marvelId}) {
        return Favourite.delete({userId, marvelId});
    }
}