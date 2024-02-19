import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  // Dummy user data store, replace this with a real database
  private users: any[] = [];

  // Function to create a new user
  createUser(userData: any): any {
    // Validate user data (you can perform validation here)

    // Create a new user object
    const newUser = {
      id: this.generateUserId(), // Generate a unique ID for the user
      ...userData, // Spread the provided user data
    };

    // Add the new user to the user data store
    this.users.push(newUser);
    Logger.log("Creating new user >>>>> ", newUser)
    // Return the newly created user
    return newUser;
  }

  // Helper function to generate a unique user ID
  private generateUserId(): number {
    // Generate a random number (you can use a more robust method)
    return Math.floor(Math.random() * 1000);
  }
}
