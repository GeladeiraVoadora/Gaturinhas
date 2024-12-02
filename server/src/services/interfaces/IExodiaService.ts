export interface IExodiaService {
  completeExodia(userId: number): Promise<{ message: string }>;
}
