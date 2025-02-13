import { AddressService } from "../../src/services/addressService";
import { prisma } from "../../src/prisma";
import { v4 } from "uuid";

jest.mock("../../src/prisma", () => ({
  prisma: {
    address: {
      create: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("AddressService Unit Tests", () => {
  const id = v4();
  const mockData = { id, address: "asd1" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an address", async () => {
    const createdAddress = { ...mockData };
    (prisma.address.create as jest.Mock).mockResolvedValue(createdAddress);

    const result = await AddressService.create(mockData);
    expect(prisma.address.create).toHaveBeenCalledWith({
      data: expect.objectContaining(mockData),
    });
    expect(result).toEqual(createdAddress);
  });

  it("should find an address by ID", async () => {
    const id = v4();
    const foundAddress = { id, address: "asd1" };
    (prisma.address.findUniqueOrThrow as jest.Mock).mockResolvedValue(
      foundAddress
    );

    const result = await AddressService.findById(id);
    expect(prisma.address.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id },
    });
    expect(result).toEqual(foundAddress);
  });

  it("should delete an address", async () => {
    const id = v4();
    const deletedAddress = { id, address: "asd1" };
    (prisma.address.delete as jest.Mock).mockResolvedValue(deletedAddress);

    const result = await AddressService.delete(id);
    expect(prisma.address.delete).toHaveBeenCalledWith({
      where: { id: id },
    });
    expect(result).toEqual(deletedAddress);
  });
});
