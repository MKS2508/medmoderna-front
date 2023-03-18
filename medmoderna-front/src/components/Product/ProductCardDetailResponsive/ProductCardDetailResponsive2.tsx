import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 80px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
`;


const ProductCardWrapper = styled.div`
  /* Estilos de product-card */
`;

const ImageContainer = styled.div`
  /* Estilos de image-container */
`;

const ProductImage = styled.img`
  /* Estilos de product-image */
`;

const ProductDetails = styled.div`
  /* Estilos de product-details */
`;

const ProductName = styled.h1`
  /* Estilos de product-name */
`;

const ProductSize = styled.p`
  /* Estilos de product-size */
`;

const ProductPrice = styled.p`
  /* Estilos de product-price */
`;

const SizeSelector = styled.div`
  /* Estilos de size-selector */
`;

const SizeDropdownContent = styled.div`
  /* Estilos de size-dropdown-content */
`;

const ProductDescription = styled.p`
  /* Estilos de product-description */
`;

const AddToCartBtn = styled.button`
  /* Estilos de add-to-cart-btn */
`;

const ToggleThemeBtn = styled.button`
  /* Estilos de toggle-theme-btn */
`;
interface Props {
    key: string;
    imgSrc: string;
    description: string;
    price: number;
    productId: string;
    name: string;
    brand: string;
    category: string;
}
const ProductCardDetailResponsive2: React.FC<Props> = ({
                                                          imgSrc,
                                                          description,
                                                          price,
                                                          productId,
                                                          name,
                                                          brand,
                                                          category,
                                                      }) => {
    const [selectedSize, setSelectedSize] = React.useState('1g');

    const handleSizeChange = (e:any) => {
        setSelectedSize(e.target.value);
    };

    return (
        <Container>
            <ProductCard>
                <ImageContainer>
                    <ProductImage src={imgSrc} alt={name} />
                </ImageContainer>
                <ProductDetails>
                    <ProductName>{name}</ProductName>
                    <ProductSize>
                        Tamaño: <span id="selected-size">{selectedSize}</span>
                    </ProductSize>
                    <ProductPrice>${price.toFixed(2)}</ProductPrice>
                    <SizeSelector>
                        <label htmlFor="size-select">Seleccionar tamaño:</label>
                        <SizeSelector id="size-select" onChange={handleSizeChange}>
                            <option value="1g">1g</option>
                            <option value="2g">2g</option>
                            <option value="5g">5g</option>
                        </SizeSelector>
                    </SizeSelector>
                    <ProductDescription>{description}</ProductDescription>
                    <AddToCartBtn>Añadir al carrito</AddToCartBtn>
                </ProductDetails>
            </ProductCard>
        </Container>
    );
};

export default ProductCardDetailResponsive2;
