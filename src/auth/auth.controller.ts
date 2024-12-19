import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/register')
    public register(@Body() userData: RegisterDTO) {
        return this.authService.register(userData);
    }
}
