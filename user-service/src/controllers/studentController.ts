import {
  Student,
  StudentCreationParams,
  StudentList,
  StudentService,
  StudentUpdateParams,
} from "../services/studentService";
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Route,
  SuccessResponse,
} from "tsoa";

@Route("student")
export class StudentController extends Controller {
  @Get("/")
  public async list(): Promise<StudentList> {
    return await StudentService.list();
  }

  @Get("{id}")
  public async findById(id: string): Promise<Student> {
    return await StudentService.findById(id);
  }

  @Post("/")
  @SuccessResponse("201", "Created")
  public async create(
    @Body() requestBody: StudentCreationParams
  ): Promise<StudentCreationParams> {
    const newStudent = await StudentService.create(requestBody);
    this.setStatus(201);
    return newStudent;
  }

  @Put("{id}")
  public async update(
    id: string,
    @Body() requestBody: StudentUpdateParams
  ): Promise<Omit<Student, "address">> {
    return await StudentService.update(id, requestBody);
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  public async delete(id: string): Promise<void> {
    await StudentService.delete(id);
    this.setStatus(204);
  }
}
