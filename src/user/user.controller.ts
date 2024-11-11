import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { SignupDto } from '../dto/user/signupDto';



@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Roles('ADMIN')
    @Post('creat_user')
    creates(@Body() signupDto: SignupDto) {
        return this.userService.create(signupDto);
    }

    @Roles('ADMIN')
    @Get('detail_user/:id')
    async getUserById(@Param('id', ParseIntPipe) user_id: number) {
        return this.userService.getUserById(user_id);

    }

}
