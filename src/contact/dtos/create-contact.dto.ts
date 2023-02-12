import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class createContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
