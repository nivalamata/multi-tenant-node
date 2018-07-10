import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Header
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

@Authorized()
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    public find(@CurrentUser({ required: true }) currentUser: User): Promise<User[]> {
        return this.userService.find(currentUser);
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public one(@CurrentUser({ required: true }) currentUser: User, @Param('id') id: number): Promise<User | undefined> {
        return this.userService.findOne(currentUser, id);
    }

    @Post()
    public create(@CurrentUser({ required: true }) currentUser: User, @Body() user: User): Promise<User> {
        return this.userService.create(currentUser, user);
    }

    @Put('/:id')
    public update(@CurrentUser({ required: true }) currentUser: User, @Param('id') id: number, @Body() user: User): Promise<User> {
        return this.userService.update(currentUser, id, user);
    }

    @Delete('/:id')
    public remove(@CurrentUser({ required: true }) currentUser: User, @Param('id') id: number): Promise<boolean> {
        return this.userService.remove(currentUser, id);
    }

    @Put('/login/:email')
    public login(@Param('email') email: string, @Header('password', 'password') password: string): Promise<User> {
        return this.userService.login(email, password);
    }

    @Post('/signup')
    public signup(@CurrentUser({ required: true }) currentUser: User, @Body() user: User): Promise<User> {
        return this.userService.signup(currentUser, user);
    }

    @Get('/pets/:id')
    public getUserAndPets(@CurrentUser({ required: true }) currentUser: User, @Param('id') id: number): Promise<User> {
        return this.userService.getUserAndPets(currentUser, id);
    }

}
