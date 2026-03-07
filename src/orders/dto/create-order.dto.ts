import { ApiProperty } from '@nestjs/swagger';

class CreateOrderItemDto {
    //DTO para o JSON recebido
  @ApiProperty({ example: '2434', description: 'ID do item' })
  idItem: string;

  @ApiProperty({ example: 1, description: 'Quantidade do item' })
  quantidadeItem: number;

  @ApiProperty({ example: 1000, description: 'Valor unitário do item' })
  valorItem: number;
}

export class CreateOrderDto {
    //DTO para criar o "order"
  @ApiProperty({ example: 'v10089016vdb-01', description: 'Número do pedido original' })
  numeroPedido: string;

  @ApiProperty({ example: 10000, description: 'Valor total do pedido' })
  valorTotal: number;

  @ApiProperty({ example: '2023-07-19T12:24:11.529Z', description: 'Data de criação' })
  dataCriacao: string;

  @ApiProperty({ type: [CreateOrderItemDto] })
  items: CreateOrderItemDto[];
}