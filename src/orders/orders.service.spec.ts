import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: PrismaService;

  // Mock do Prisma para não precisar de banco de dados real nos testes
  const mockPrismaService = {
    order: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    item: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    // Configuração do módulo de teste injetando o Mock do Prisma
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    // Verifica se o serviço foi instanciado corretamente
    expect(service).toBeDefined();
  });

  describe('create (Mapping Logic)', () => {
    it('deve mapear os campos corretamente de PT para EN e criar o pedido', async () => {
      // Simulação de um JSON enviado pelo sistema
      const dtoLegado = {
        numeroPedido: 'ABC-123',
        valorTotal: 1500.50,
        dataCriacao: '2023-10-27T10:00:00Z',
        items: [
          { idItem: '101', quantidadeItem: 2, valorItem: 750.25 }
        ]
      };

      // Simula o retorno do banco de dados após criação
      mockPrismaService.order.create.mockResolvedValue({ orderId: 'ABC-123', ...dtoLegado });

      await service.create(dtoLegado);

      // Verificação do mapping de português para inglês
      expect(mockPrismaService.order.create).toHaveBeenCalledWith({
        data: {
          orderId: 'ABC-123',
          value: 1500.50,
          creationDate: expect.any(Date),
          items: {
            create: [
              { productId: 101, quantity: 2, price: 750.25 }
            ]
          }
        },
        include: { items: true }
      });
    });

    it('deve lançar BadRequestException se o mapping falhar', async () => {
      // Testa uma falha genérica no processo de criação/banco
      mockPrismaService.order.create.mockRejectedValue(new Error('DB Error'));
      
      // Verifica se o service captura o erro e lança a exceção correta do NestJS
      await expect(service.create({})).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('deve retornar um pedido se encontrado', async () => {
      // Simula o retorno de um pedido existente no banco
      const result = { orderId: '123', value: 100 };
      mockPrismaService.order.findUnique.mockResolvedValue(result);

      expect(await service.findOne('123')).toBe(result);
    });

    it('deve lançar NotFoundException se o pedido não existir', async () => {
      // Simula o caso onde o Prisma não encontra o registro (retorna null)
      mockPrismaService.order.findUnique.mockResolvedValue(null);
      
      // Verifica se o service lança o erro 404 (Not Found) corretamente
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });
});