import { Model, Document, FilterQuery, UpdateQuery } from "mongoose"

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return await this.entityModel.findOne(entityFilterQuery).exec()
  }

  async find(entityFilterQuery: FilterQuery<T> = {}) {
    return await this.entityModel.find(entityFilterQuery).exec()
  }

  async create(createEntityDto: Partial<T>): Promise<T> {
    const createdDocument = new this.entityModel(createEntityDto)
    return await createdDocument.save()
  }

  async update(
    entityFilterQuery: FilterQuery<T>,
    updateEntityDto: UpdateQuery<T>
  ): Promise<T | null> {
    return await this.entityModel
      .findOneAndUpdate(entityFilterQuery, updateEntityDto, { new: true })
      .exec()
  }

  async delete(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return await this.entityModel.findOneAndDelete(entityFilterQuery).exec()
  }
}
