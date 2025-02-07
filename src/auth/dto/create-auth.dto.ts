import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateAuthDto {
  @IsString({ message: 'Please enter a valid name' })
  name: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'Please enter a valid password' })
  @Length(8, 50, {
    message: 'Password length must be between 8 and 50 charcters',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$%^&*()_+|~=`{}\[\]:;<>?,.@#%+\/\-])[a-zA-Z\d!$%^&*()_+|~=`{}\[\]:;<>?,.@#%+\/\-]+$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    },
  )
  password: string;
}
