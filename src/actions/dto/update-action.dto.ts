import { IsString } from 'class-validator';

export class UpdateActionDto {
  @IsString({ message: 'Please enter a valid name' })
  title: string;

  @IsString({ message: 'Please enter a valid description' })
  description: string;
}
