import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { PasswordService } from './password/password.service'; // Import PasswordService

@Injectable()
export class UserRepository {
  private users: any[] = [];
  constructor(private readonly passwordService: PasswordService) {}

  async createUser(userData: CreateUserDto) {
    const id = this.generateUserId();
    const hashedPassword = await this.passwordService.hashPassword(
      userData.password,
    );

    // Create the user object
    const user = {
      id,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    };

    // Save the user or perform any other data access operation
    // For example, you can save it to a database
    // Assuming this is where you would save the user data
    // this.users.push(user);

    // Log the creation of the user
    this.users.push(user);
    Logger.log('Creating new user >>>>> ', user);

    // Return the created user
    return user;
  }

  // Helper function to generate a unique user ID
  private generateUserId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
