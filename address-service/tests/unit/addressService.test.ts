import { AddressService } from "../../src/services/addressService";
import { prisma } from "../../src/prisma";

jest.mock("../../src/prisma", () => ({
  prisma: {
    address: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("AddressService Unit Tests", () => {
  const mockData = { address: "asd1", userId: "user1" };

  it("should create an address", async () => {
    const createdAddress = { id: "generated-uuid", ...mockData };
    (prisma.address.create as jest.Mock).mockResolvedValue(createdAddress);
    const result = await AddressService.create(mockData);
    expect(prisma.address.create).toHaveBeenCalledWith({
      data: expect.objectContaining(mockData),
    });
    expect(result).toEqual(createdAddress);
  });

  it("should find an address by ID", async () => {
    const addressId = "id1";
    const foundAddress = { id: addressId, ...mockData };
    (prisma.address.findUnique as jest.Mock).mockResolvedValue(foundAddress);
    const result = await AddressService.findById(addressId);
    expect(prisma.address.findUnique).toHaveBeenCalledWith({
      where: { id: addressId },
    });
    expect(result).toEqual(foundAddress);
  });

  it("should find addresses by user ID", async () => {
    const addresses = [{ id: "1", ...mockData }];
    (prisma.address.findMany as jest.Mock).mockResolvedValue(addresses);
    const result = await AddressService.findByUserId(mockData.userId);
    expect(prisma.address.findMany).toHaveBeenCalledWith({
      where: { userId: mockData.userId },
    });
    expect(result).toEqual(addresses);
  });

  it("should update an address", async () => {
    const addressId = "id1";
    const updatePayload = { address: "asd2" };
    const updatedAddress = { id: addressId, ...mockData, ...updatePayload };
    (prisma.address.update as jest.Mock).mockResolvedValue(updatedAddress);
    const result = await AddressService.update(addressId, updatePayload);
    expect(prisma.address.update).toHaveBeenCalledWith({
      where: { id: addressId },
      data: updatePayload,
    });
    expect(result).toEqual(updatedAddress);
  });

  it("should delete an address", async () => {
    const addressId = "id1";
    const deletedAddress = { id: addressId, ...mockData };
    (prisma.address.delete as jest.Mock).mockResolvedValue(deletedAddress);
    const result = await AddressService.delete(addressId);
    expect(prisma.address.delete).toHaveBeenCalledWith({
      where: { id: addressId },
    });
    expect(result).toEqual(deletedAddress);
  });
});
