import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
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

  async findAll() {
    // Retorna todos os pedidos integrados no banco com seus respectivos itens
    return await this.prisma.order.findMany({
      include: { items: true },
    });
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

  async update(orderId: string, updateData: { value?: number }) {
    try {
      // Atualiza campos específicos de um pedido (ex: valorTotal mapeado para value)
      return await this.prisma.order.update({
        where: { orderId },
        data: updateData,
      });
    } catch (error) {
      // Erro caso o ID não exista ou os dados sejam inválidos
      throw new NotFoundException(`Não foi possível atualizar o pedido ${orderId}.`);
    }
  }

  async remove(orderId: string) {
    try {
      // Para manter a integridade no SQLite, removemos os itens primeiro
      await this.prisma.item.deleteMany({
        where: { orderId },
      });

      // Remove o pedido principal após limpar os itens
      return await this.prisma.order.delete({
        where: { orderId },
      });
    } catch (error) {
      // Erro caso o pedido já não exista ou ocorra falha no banco
      throw new NotFoundException(`Erro ao tentar remover o pedido ${orderId}.`);
    }
  }
}