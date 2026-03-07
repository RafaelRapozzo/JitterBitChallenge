import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Patch, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

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
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os pedidos integrados no sistema' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos recuperada com sucesso.' })
  async findAll() {
    // Rota para listar todos os registros integrados
    return await this.ordersService.findAll();
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Busca pedido transformado pelo ID' })
  async findOne(@Param('orderId') orderId: string) {
    return await this.ordersService.findOne(orderId);
  }

  @Patch(':orderId')
  @ApiOperation({ summary: 'Atualiza o valor de um pedido existente' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado para atualização.' })
  async update(
    @Param('orderId') orderId: string, 
    @Body() updateData: { valorTotal: number }
  ) {
    // Rota para atualizar o valor, mantendo o mapping de valorTotal -> value
    return await this.ordersService.update(orderId, { value: updateData.valorTotal });
  }

  @Delete(':orderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um pedido e os seus itens do sistema' })
  @ApiResponse({ status: 204, description: 'Pedido removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado para remoção.' })
  async remove(@Param('orderId') orderId: string) {
    // Rota para deletar registros
    return await this.ordersService.remove(orderId);
  }
}