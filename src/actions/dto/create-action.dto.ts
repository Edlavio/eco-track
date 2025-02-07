import { IsEnum, IsString, IsUUID } from 'class-validator';
import { Categories } from 'utils/categories';

export class CreateActionDto {
  @IsString({ message: 'Please enter a valid name' })
  title: string;

  @IsString({ message: 'Please enter a valid description' })
  description: string;

  @IsEnum(Categories)
  category: Categories;

  @IsUUID()
  userId: string;
}
