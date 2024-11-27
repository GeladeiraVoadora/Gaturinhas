export interface IGaturinhaService {
  createGaturinha(userId: number, data: any): Promise<{ msg?: string; error?: string }>;
  createCompra(gatId: number, email: string): Promise<boolean | { error: string }>;
  sellGaturinha(prodId: number, email: string): Promise<boolean | { error: string }>;
  ressuscitaGaturinha(gatId: number, email: string): Promise<boolean | { error: string }>;
}
