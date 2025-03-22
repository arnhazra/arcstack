import { Model, Document, FilterQuery, UpdateQuery } from "mongoose"

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  findOne(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return this.entityModel.findOne(entityFilterQuery)
  }

  find(entityFilterQuery: FilterQuery<T> = {}) {
    return this.entityModel.find(entityFilterQuery)
  }

  countDocuments(entityFilterQuery: FilterQuery<T> = {}) {
    return this.entityModel.countDocuments(entityFilterQuery)
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
