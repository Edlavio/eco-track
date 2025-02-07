import { IsEnum } from 'class-validator';
import { Categories } from 'utils/categories';

export class UpdateActionCategoryDto {
  @IsEnum(Categories)
  category: Categories;
}
