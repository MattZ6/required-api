import { UserAlreadyExistsWithThisEmailError } from '../../../domain/error/UserAlreadyExistsWithThisEmail';
import { ICreateUserUseCase } from '../../../domain/usecases/CreateUser';
import { created, unprocessableEntity } from '../../helpers/http/http';
import { IController } from '../../protocols/Controller';
import { IHttpRespose } from '../../protocols/Http';
import { SignUpRequest } from './SignUpController.types';

export class SignUpController implements IController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(request: SignUpRequest): Promise<IHttpRespose> {
    try {
      const { name, email, password } = request.body;

      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof UserAlreadyExistsWithThisEmailError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}
