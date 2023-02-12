import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { createContactDto } from './dtos/create-contact.dto';
import { Contact } from './entity/contact.entity';

@Controller('contact')
export class ContactController {
  @Inject()
  private readonly service: ContactService;

  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Get(':id')
  findOneOrFail(@Param('id') id: string) {
    return this.service.findOneOrFail(id);
  }
  @Post()
  create(@Body() contact: createContactDto) {
    return this.service.create(contact);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() contact: Partial<Contact>) {
    return this.service.update(id, contact);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
