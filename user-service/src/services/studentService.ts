import { prisma } from "../prisma";
import { client } from "../client/client.gen";
import {
  create as createAddress,
  findById as getAddress,
  delete_ as deleteAddress,
} from "../client";
import * as EmailValidator from "email-validator";
import { ValidateError } from "tsoa";
import { v4 } from "uuid";

export type Student = {
  id: string;
  name: string;
  email: string;
  address: string;
};

export type StudentCreationParams = Pick<Student, "name" | "email" | "address">;
export type StudentUpdateParams = Pick<Student, "name" | "email">;
export type StudentList = Array<Omit<Student, "address">>;

client.setConfig({
  baseUrl: process.env.ADDRESS_SERVICE_URL || "http://localhost:3000",
});

export class StudentService {
  static async list(): Promise<StudentList> {
    return prisma.student.findMany();
  }

  static async findById(id: string) {
    const student = await prisma.student.findUniqueOrThrow({
      where: { id },
    });

    const address = await getAddress({ path: { id } });

    if (!address.data) throw new Error("Failed to create address for student");

    return {
      ...student,
      address: address.data?.address,
    };
  }

  static async create(data: StudentCreationParams) {
    if (!EmailValidator.validate(data.email)) {
      throw new ValidateError(
        {
          email: {
            message: "Invalid email",
          },
        },
        "Invalid email"
      );
    }

    const addr = data.address;
    delete (data as any).address;
    const student = await prisma.student.create({
      data: {
        id: v4(),
        ...data,
      },
    });

    const address = await createAddress({
      body: {
        id: student.id,
        address: addr,
      },
    });

    if (!address.data) throw new Error("Failed to create address for student");

    return {
      ...student,
      address: address.data.address,
    };
  }

  static async update(id: string, data: StudentUpdateParams) {
    return prisma.student.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    await deleteAddress({ path: { id } });

    return prisma.student.delete({
      where: { id },
    });
  }
}
