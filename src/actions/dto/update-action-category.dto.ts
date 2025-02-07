import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Categories } from 'utils/categories';

export class UpdateActionCategoryDto {
  @ApiProperty()
  @IsEnum(Categories)
  category: Categories;
}
