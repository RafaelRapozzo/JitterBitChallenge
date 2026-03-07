import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('orders')
//Mapeio para o Swagger
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria pedido com mapping automático' })
  @ApiResponse({ status: 201, description: 'Sucesso no mapping e gravação.' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    //Recebe e grava as informações
    return await this.ordersService.create(createOrderDto);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Busca pedido transformado pelo ID' })
  async findOne(@Param('orderId') orderId: string) {
    // Recebe "orderId" como parâmetro para procurar o pedido desejado
    return await this.ordersService.findOne(orderId);
  }
}