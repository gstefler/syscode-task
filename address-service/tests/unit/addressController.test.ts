import { v4 } from "uuid";
import { AddressController } from "../../src/controllers/addressController";
import { AddressService } from "../../src/services/addressService";

jest.mock("../../src/services/addressService");

describe("AddressController Unit Tests", () => {
  let controller: AddressController;

  beforeEach(() => {
    controller = new AddressController();
  });

  it("should create an address via controller", async () => {
    const id = v4();
    const payload = { id, address: "asd1" };
    const mockCreatedAddress = { ...payload };

    (AddressService.create as jest.Mock).mockResolvedValue(mockCreatedAddress);

    const result = await controller.create(payload);
    expect(AddressService.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual(mockCreatedAddress);
  });

  it("should get addresses by id via controller", async () => {
    const id = v4();
    const mockAddresses = [{ id, address: "asd1" }];
    (AddressService.findById as jest.Mock).mockResolvedValue(mockAddresses);

    const result = await controller.findById(id);
    expect(AddressService.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockAddresses);
  });

  it("should delete an address via controller", async () => {
    const id = v4();
    (AddressService.delete as jest.Mock).mockResolvedValue(undefined);

    await controller.delete(id);
    expect(AddressService.delete).toHaveBeenCalledWith(id);
  });
});
