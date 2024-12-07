import { Injectable } from "@nestjs/common"

@Injectable()
export class FavouritesService {
  create(createFavouriteDto: any) {
    return "This action adds a new favourite"
  }

  findAll() {
    return `This action returns all favourites`
  }

  findOne(id: number) {
    return `This action returns a #${id} favourite`
  }

  update(id: number, updateFavouriteDto: any) {
    return `This action updates a #${id} favourite`
  }

  remove(id: number) {
    return `This action removes a #${id} favourite`
  }
}
