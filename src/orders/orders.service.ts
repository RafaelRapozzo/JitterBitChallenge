import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  //Construtor com PrismaService para utilizar as ferramentas prisma

  async create(createOrderDto: any) {
    try {
      // Mapping dos dados
      // numeroPedido -> orderId | valorTotal -> value | idItem -> productId
      const orderData = {
        orderId: createOrderDto.numeroPedido,
        value: createOrderDto.valorTotal,
        creationDate: new Date(createOrderDto.dataCriacao),
        items: {
          create: createOrderDto.items.map((item: any) => ({
            productId: parseInt(item.idItem),
            quantity: item.quantidadeItem,
            price: item.valorItem,
          })),
        },
      };

      return await this.prisma.order.create({
        //Usa os dados ja mapeados para criar um pedido
        data: orderData,
        include: { items: true },
      });
    } catch (error) {
        //Catch para pegar algum erro
      throw new BadRequestException('Erro ao processar integração: ' + error.message);
    }
  }

  async findOne(orderId: string) {
    // Procura no banco de dados usando ID informado
    const order = await this.prisma.order.findUnique({
      where: { orderId },
      include: { items: true },
    });

    if (!order) {
        //verificação para caso o usuário tente colocar um "orderId" não existente
      throw new NotFoundException(`Pedido com ID ${orderId} não encontrado.`);
    }

    return order;
  }
}