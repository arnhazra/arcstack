import { Injectable } from "@nestjs/common"

@Injectable()
export class FavouritesService {
  create(createFavouriteDto: any) {
    return "This action adds a new favourite"
  }

  findAll() {
    return `This action returns all favourites`
  }

  remove(id: number) {
    return `This action removes a #${id} favourite`
  }
}
