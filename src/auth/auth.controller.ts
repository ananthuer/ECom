
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Get, Request, Post, UseGuards, Body, ValidationPipe, Response } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CustomerDto } from './dto/authenticate-customer.dto';
import { VerifyDto } from './dto/verify.dto';

import { IsValidPassword } from './password-decorator';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {

    return req.user;
  }

  @Post('customer/register')
  create(@Body(new ValidationPipe({
    transform: true,
			transformOptions: {enableImplicitConversion: true},
			forbidNonWhitelisted: true

  })) createUserDto: CreateUserDto) {

  return this.authService.create(createUserDto);
}



 
}
