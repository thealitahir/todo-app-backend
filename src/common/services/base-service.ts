import { PrismaClient } from '@prisma/client';

// Base Service
export class BaseService<T> {
  protected prisma: PrismaClient;
  protected entityName: string;

  constructor(prisma: PrismaClient, entityName: string) {
    this.prisma = prisma;
    this.entityName = entityName;
  }

  async findAll(opts?): Promise<T[]> {
    return this.prisma[this.entityName].findMany(opts);
  }

  async findOne(opts?): Promise<T | null> {
    return this.prisma[this.entityName].findFirst(opts);
  }

  async findByIds(itemIds: string[]): Promise<T[]> {
    return this.prisma[this.entityName].findMany({
      where: { id: { in: itemIds } },
    });
  }

  async save(payload: any): Promise<T> {
    return this.prisma[this.entityName].create({
      data: payload,
    });
  }

  async update(id: string, payload: any): Promise<T> {
    return this.prisma[this.entityName].update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: string): Promise<T> {
    return this.prisma[this.entityName].delete({
      where: { id },
    });
  }

  async softDelete(id: string): Promise<T> {
    return this.prisma[this.entityName].update({
      where: { id },
      data: { deleted_at: true }, // Assuming your schema has a 'deleted' field
    });
  }

  async count(): Promise<number> {
    return this.prisma[this.entityName].count();
  }
}
