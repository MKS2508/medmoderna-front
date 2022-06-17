export interface IProductProps {
  productId: string | number,
  name: string,
  description: string,
  price?:number,
  imgSrc: string,
  category?: {
    name: string,
    totalProducts: number
  },
  brand:string

}