import { AddressController } from "../../src/controllers/addressController";
import { AddressService } from "../../src/services/addressService";

jest.mock("../../src/services/addressService");

describe("AddressController Unit Tests", () => {
  let controller: AddressController;

  beforeEach(() => {
    controller = new AddressController();
  });

  it("should create an address via controller", async () => {
    const payload = { address: "asd1", userId: "user1" };
    const mockCreatedAddress = { id: "generated-uuid", ...payload };

    (AddressService.create as jest.Mock).mockResolvedValue(mockCreatedAddress);

    const result = await controller.create(payload);
    expect(AddressService.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual(mockCreatedAddress);
  });

  it("should get addresses by user id via controller", async () => {
    const userId = "user1";
    const mockAddresses = [{ id: "1", address: "asd1", userId }];
    (AddressService.findByUserId as jest.Mock).mockResolvedValue(mockAddresses);

    const result = await controller.findByUserId(userId);
    expect(AddressService.findByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockAddresses);
  });

  it("should update an address via controller", async () => {
    const addressId = "id1";
    const payload = { address: "asd1" };
    const updatedAddress = { id: addressId, ...payload };
    (AddressService.update as jest.Mock).mockResolvedValue(updatedAddress);

    const result = await controller.update(addressId, payload);
    expect(AddressService.update).toHaveBeenCalledWith(addressId, {
      address: payload.address,
    });
    expect(result).toEqual(updatedAddress);
  });

  it("should delete an address via controller", async () => {
    const addressId = "id1";
    (AddressService.delete as jest.Mock).mockResolvedValue(undefined);

    await controller.delete(addressId);
    expect(AddressService.delete).toHaveBeenCalledWith(addressId);
  });
});
