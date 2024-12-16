import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.findByEmail(email);

    if (users.length) {
      throw new BadRequestException('Email in use.');
    }
  }
}
