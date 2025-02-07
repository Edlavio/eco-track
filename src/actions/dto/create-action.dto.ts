import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { Categories } from 'utils/categories';

export class CreateActionDto {
  @ApiProperty()
  @IsString({ message: 'Please enter a valid name' })
  title: string;

  @ApiProperty()
  @IsString({ message: 'Please enter a valid description' })
  description: string;

  @ApiProperty()
  @IsEnum(Categories)
  category: Categories;

  @ApiProperty()
  @IsUUID()
  userId: string;
}
