
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';



@Injectable()
export class AuthService {
  
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
  let user: User = await this.userService.fetchUserByEmailOrPhone(username);



if(user){


  if (user && await bcrypt.compare(pass, user.Password)) {
    const payload = { id: user.id, name: user.Name, email: user.Email};
    return {
      access_token: this.jwtService.sign(payload),

    };
  }
}else {
  
  
  if (user && await bcrypt.compare(pass, user.Password)) {
    const payload = { id: user.id, name: user.Name, email: user.Email};
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}

  
    return null;
} 

 
async create(createUserDto:CreateUserDto){
    const saltRounds = 10;


    const hash = await bcrypt.hash(createUserDto.password, saltRounds);
    let user = {
        Name:createUserDto.name,
        Email:createUserDto.email,
        Password:hash,
        Role:createUserDto.roles,
        Address:createUserDto.address
    }

   let newUser = await User.create(user)


  //  let userItem = await User.findByPk(newUser.id)

  
   if(newUser){


 
      const payload = { id: newUser.id, roles: newUser.Role,name: user.Name, email: user.Email};
      return {
        access_token: this.jwtService.sign(payload),
  
      };
    }
  else {
    
    
    {
      const payload = { id: newUser.id,roles: newUser.Role, name: user.Name, email: user.Email};
      return {
        access_token: this.jwtService.sign(payload)
      };
    }
  }
}








  
}