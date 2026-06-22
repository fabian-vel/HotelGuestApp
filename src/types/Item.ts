export interface Item {
  id: string;
  title: string;
  /** URL remota (string) o recurso local (number via require()) */
  image: string;
  description: string;
  price: number;
  category?: string;
  quantity?: number;
}
