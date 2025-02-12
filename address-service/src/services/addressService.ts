import { ValidateError } from "tsoa";
import { prisma } from "../prisma";
import { validate as isValidUUID } from "uuid";

export type AddressCreationDto = {
  id: string;
  address: string;
};

export class AddressService {
  static async create(data: AddressCreationDto) {
    if (!isValidUUID(data.id)) {
      throw new ValidateError(
        {
          id: {
            message: "Invalid UUID",
          },
        },
        "Invalid UUID"
      );
    }

    if (!data.address) {
      data.address = Math.random().toString(36).substring(7);
    }
    return prisma.address.create({
      // typescript misery
      data: data as any,
    });
  }

  static async findById(id: string) {
    return prisma.address.findUniqueOrThrow({
      where: { id },
    });
  }

  static async delete(id: string) {
    return prisma.address.delete({
      where: { id },
    });
  }
}
