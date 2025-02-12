import { v4 as uuidv4 } from "uuid";
import { prisma } from "../prisma";

export type Address = {
  id: string;
  address: string;
  userId: string;
};

export type AddressCreationParams = Pick<Address, "address" | "userId">;
export type AddressUpdateParams = Pick<Address, "address">;

export class AddressService {
  static async create(data: AddressCreationParams) {
    return prisma.address.create({
      data: {
        id: uuidv4(),
        ...data,
      },
    });
  }

  static async findById(id: string) {
    return prisma.address.findUnique({
      where: { id },
    });
  }

  static async findByUserId(userId: string) {
    return prisma.address.findMany({
      where: { userId },
    });
  }

  static async update(id: string, data: AddressUpdateParams) {
    return prisma.address.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.address.delete({
      where: { id },
    });
  }
}
