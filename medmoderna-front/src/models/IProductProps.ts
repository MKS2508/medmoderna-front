export interface IProductProps {
  productId: number ,
  name: string,
  description: string,
  price:number,
  imgSrc: string ,
  imgSrc2?: string,
  imgBlobSrc?: string | Blob ,
  imgBlobSrc2?: string | Blob | undefined,
  category: string,
  brand:string

}