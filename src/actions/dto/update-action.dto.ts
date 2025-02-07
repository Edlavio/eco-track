import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateActionDto {
  @ApiProperty()
  @IsString({ message: 'Please enter a valid name' })
  title: string;

  @ApiProperty()
  @IsString({ message: 'Please enter a valid description' })
  description: string;
}
