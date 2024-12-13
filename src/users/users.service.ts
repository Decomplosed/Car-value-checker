import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user: any = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async delete(id: number) {
    const user: any = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    return this.repo.delete(user);
  }
}
