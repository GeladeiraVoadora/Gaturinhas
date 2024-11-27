export interface ICemiterioService {
    createGatinhoFalecido(userId: number, gatId: number): Promise<{ msg?: string; error?: string }>;
    removeToCemiterio(FalecidoId: number): Promise<boolean | { error: string }>;
    findAllGatinhosFalecidos(userId: number): Promise<any[]>;
  }
  