import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActionsService } from './actions.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    example: [
      {
        title: 'Reciclar',
        description: 'Detalhes da ação de reciclagem',
        category: 'Reciclagem',
        points: 5,
        userId: '4e0cbba6-f545-45aa-af8b-1a6f83869d47',
        actionId: '7150974f-f915-41ab-bca4-07d50df2fcf0',
        createdAt: '2025-02-07T14:30:39.675Z',
        updatedAt: '2025-02-07T14:35:54.621Z',
      },
    ],
  })
  create(@Body() createActionDto: CreateActionDto) {
    return this.actionsService.create(createActionDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    example: [
      {
        title: 'Reciclar',
        description: 'Detalhes da ação de reciclagem',
        category: 'Reciclagem',
        points: 5,
        userId: '4e0cbba6-f545-45aa-af8b-1a6f83869d47',
        actionId: '7150974f-f915-41ab-bca4-07d50df2fcf0',
        createdAt: '2025-02-07T14:30:39.675Z',
        updatedAt: '2025-02-07T14:35:54.621Z',
      },
    ],
  })
  findAll() {
    return this.actionsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    example: [
      {
        title: 'Reciclar',
        description: 'Detalhes da ação de reciclagem',
        category: 'Reciclagem',
        points: 5,
        userId: '4e0cbba6-f545-45aa-af8b-1a6f83869d47',
        actionId: '7150974f-f915-41ab-bca4-07d50df2fcf0',
        createdAt: '2025-02-07T14:30:39.675Z',
        updatedAt: '2025-02-07T14:35:54.621Z',
      },
    ],
  })
  @ApiResponse({
    status: 404,
    description: 'Action not found',
  })
  findOne(@Param('id') id: string) {
    return this.actionsService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    example: [
      {
        title: 'Reciclar',
        description: 'Detalhes da ação de reciclagem',
        category: 'Reciclagem',
        points: 5,
        userId: '4e0cbba6-f545-45aa-af8b-1a6f83869d47',
        actionId: '7150974f-f915-41ab-bca4-07d50df2fcf0',
        createdAt: '2025-02-07T14:30:39.675Z',
        updatedAt: '2025-02-07T14:35:54.621Z',
      },
    ],
  })
  @ApiResponse({
    status: 404,
    description: 'Action not found',
  })
  @Get(':id/user')
  findAllByUser(@Param('id') id: string) {
    return this.actionsService.findAllByUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionDto: UpdateActionDto) {
    return this.actionsService.update(id, updateActionDto);
  }

  @ApiResponse({
    status: 200,
    example:
      'Action with id 4e0cbba6-f545-45aa-af8b-1a6f83869d47 deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Action not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionsService.remove(id);
  }
}
