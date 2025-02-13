import { StudentController } from "../../src/controllers/studentController";
import { StudentService } from "../../src/services/studentService";

jest.mock("../../src/services/studentService");

describe("StudentController Unit Tests", () => {
  let controller: StudentController;

  beforeEach(() => {
    controller = new StudentController();
  });

  it("should list students via controller", async () => {
    const mockStudents = [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@test.com",
        address: "Mocked Address 1",
      },
      {
        id: "2",
        name: "Jane Doe",
        email: "jane.doe@test.com",
        address: "Mocked Address 2",
      },
    ];

    (StudentService.list as jest.Mock).mockResolvedValue(mockStudents);

    const result = await controller.list();
    expect(StudentService.list).toHaveBeenCalled();
    expect(result).toEqual(mockStudents);
  });

  it("should create a student via controller", async () => {
    const payload = {
      name: "John Doe",
      email: "jhon.doe@test.com",
      address: "Mocked Address",
    };
    const mockCreatedStudent = { ...payload, id: "1" };

    (StudentService.create as jest.Mock).mockResolvedValue(mockCreatedStudent);

    const result = await controller.create(payload);
    expect(StudentService.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual(mockCreatedStudent);
  });

  it("should get a student via controller", async () => {
    const studentId = "1";
    const mockStudent = {
      id: "1",
      name: "John Doe",
      email: "john.doe@test.com",
      address: "Mocked Address 1",
    };

    (StudentService.findById as jest.Mock).mockResolvedValue(mockStudent);

    const result = await controller.findById(studentId);
    expect(StudentService.findById).toHaveBeenCalledWith(studentId);
    expect(result).toEqual(mockStudent);
  });

  it("should update a student via controller", async () => {
    const studentId = "1";
    const payload = {
      name: "John Doe Updated",
      email: "john.doe.updated@test.com",
      address: "Updated Address",
    };
    const mockUpdatedStudent = { ...payload, id: studentId };

    (StudentService.update as jest.Mock).mockResolvedValue(mockUpdatedStudent);

    const result = await controller.update(studentId, payload);
    expect(StudentService.update).toHaveBeenCalledWith(studentId, payload);
    expect(result).toEqual(mockUpdatedStudent);
  });

  it("should delete a student via controller", async () => {
    const studentId = "1";

    (StudentService.delete as jest.Mock).mockResolvedValue(true);

    await controller.delete(studentId);
    expect(StudentService.delete).toHaveBeenCalledWith(studentId);
  });
});
