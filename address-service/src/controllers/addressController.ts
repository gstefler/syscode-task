import {
  Route,
  Post,
  Delete,
  Controller,
  SuccessResponse,
  Body,
  Get,
} from "tsoa";
import { AddressService, AddressCreationDto } from "../services/addressService";

@Route("address")
export class AddressController extends Controller {
  @Get("{id}")
  public async findById(id: string): Promise<AddressCreationDto> {
    return await AddressService.findById(id);
  }

  @Post("/")
  @SuccessResponse("201", "Created")
  public async create(
    @Body() requestBody: AddressCreationDto
  ): Promise<AddressCreationDto> {
    const newAddress = await AddressService.create(requestBody);
    this.setStatus(201);
    return newAddress;
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  public async delete(id: string): Promise<void> {
    await AddressService.delete(id);
    this.setStatus(204);
  }
}
