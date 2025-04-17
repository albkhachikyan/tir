import { hashPassword } from "../utils/auth";

type UserProps = {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "TEACHER" | "PUPIL";
  grade?: number;
};

class CreateUserDto {
  public user: any;

  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  public async createUser() {
    const { name, email, role, grade, password } = this.props;

    const hashedPassword = await this.encodePassword(password);

    if (role === "TEACHER") {
      return {
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          teacher: { create: { name } },
        },
        include: { teacher: true },
      };
    }

    if (role === "PUPIL") {
      if (grade === undefined) {
        throw new Error("Grade is required for pupil");
      }

      return {
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          pupil: { create: { name, grade } },
        },
        include: { pupil: true },
      };
    }

    return {
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    };
  }

  private async encodePassword(password: string) {
    const hashedPassword = await hashPassword(password);
    return hashedPassword;
  }
}

export default CreateUserDto;
