import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  //password: ajinkya-test-password
  private readonly hardcodedUser: User = {
    id: '901ff7b6-da6f-4789-9f24-012035416879',
    username: 'ajinkya-test',
    password: '$2a$12$PZjFYdNWg660PA9pYwkh6u46fVRyH8OHl6Xt4VapuFJr3tCCnUX3i',
    email: 'ajinkya-test@gmail.com',
    firstName: 'Ajinkya'
  };

  async validateUser(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (username !== this.hardcodedUser.username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      this.hardcodedUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: this.hardcodedUser.id, username: this.hardcodedUser.username };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    const payload = { username: user.username, sub: user.id };
    return {
      userId: this.hardcodedUser.id,
      email: this.hardcodedUser.email,
      firstName: this.hardcodedUser.firstName,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
