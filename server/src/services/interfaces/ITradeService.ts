export interface ITradeService {
  findRepeated(invId: number): Promise<any[]>;
  tradeCardsRandom(prodIds: number[], invId: number): Promise<any>;
  tradeCardsEqual(prodIds: number[], invId: number): Promise<any>;
}