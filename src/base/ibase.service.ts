export interface IBaseService<T, K> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(dto: K): Promise<T>;
  update(dto: any): Promise<T>;
  delete(id: string): Promise<T>;
}
