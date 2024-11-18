export interface ICemiterioService {
    createGatinhoFalecido(userId: number, data: any): Promise<{ msg?: string; error?: string }>;
    addToCemiterio(gatId: number): Promise<boolean | { error: string }>;
    removeToCemiterio(gatId: number): Promise<boolean | { error: string }>;
  }
  