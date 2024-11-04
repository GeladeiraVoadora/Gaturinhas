export interface IGaturinhaService {
  createGaturinha(userId: number, data: any): Promise<{ msg?: string; error?: string }>;
  createCompra(gatId: number, email: string): Promise<boolean | { error: string }>;
}
