import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDto } from 'src/user/user.dto/create-user.dto'
import { UpdateUserDto } from './user.dto/update-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('info')
	getUsers(): Promise<User[]> {
		return this.userService.getUsers();
	}
	
	@Post('create')

	createUser(@Body () userData:CreateUserDto){
		return this.userService.createUser(userData)
	}
	
	@Patch('update/:id')

	updateUser(@Param('id') id:number, @Body() updatedData: UpdateUserDto){
		return this.userService.updateUser(id, updatedData)
	}
	
	@Delete('delete/:id')
	deleteUser(@Param('id') id:number){
		return this.userService.deleteUser(id)
	}
}
