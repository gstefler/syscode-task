import {
  Route,
  Post,
  Get,
  Put,
  Delete,
  Controller,
  SuccessResponse,
  Body,
} from "tsoa";
import {
  AddressCreationParams,
  AddressService,
  Address,
  AddressUpdateParams,
} from "../services/addressService";

@Route("address")
export class AddressController extends Controller {
  @Post("/")
  @SuccessResponse("201", "Created")
  public async create(
    @Body() requestBody: AddressCreationParams
  ): Promise<Address> {
    const newAddress = await AddressService.create(requestBody);
    this.setStatus(201);
    return newAddress;
  }

  @Get("user/{id}")
  public async findByUserId(id: string): Promise<Address[]> {
    return AddressService.findByUserId(id);
  }

  @Put("{id}")
  public async update(
    id: string,
    @Body() requestBody: AddressUpdateParams
  ): Promise<Address> {
    return AddressService.update(id, requestBody);
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  public async delete(id: string): Promise<void> {
    await AddressService.delete(id);
    this.setStatus(204);
  }
}
