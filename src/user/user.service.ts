import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { NotFoundError } from 'rxjs'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService){}

	async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
	async getUsers(): Promise<User[]> {
		return await this.prisma.user.findMany()
	}
	
	async createUser(userData){
		return await this.prisma.user.create({
			data:{
				email: userData.email,
				password:userData.password,
			}
		})
			
	
	}
	
	
	async updateUser(id:number, updatedData){
		return await this.prisma.user.update({
			
			where: {id},
			data:{
				email:updatedData.email,
				displayName:updatedData.displayName,
			}
		})
	}
	
	async deleteUser(id:number){
		const user = await this.prisma.user.findUnique({
			where:{id}
		})
		if(!user){
			throw new NotFoundError(`Something went wrong...`)
		}
		
		await this.prisma.user.delete({
			where:{id},
		})
		return `User with id: ${id} was successfully deleted!`
			
		
		
		
	}
}
