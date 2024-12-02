export interface ICemiterioService {
    createGatinhoFalecido(userId: number, gatId: number): Promise<{ msg?: string; error?: string }>;
    removeToCemiterio(falecidoId: number): Promise<boolean | { error: string }>;
    findAllGatinhosFalecidos(userId: number): Promise<any[]>;
  }
  