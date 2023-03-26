import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import { IProductPageProps } from '../../models/IProductPageProps';
import { IProductProps } from '../../models/IProductProps';
import { getProductsFromBrand, getProductsFromCategory } from '../../services/api-products-service';
import { useParams } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage/AnimatedPage';
import ProductCardsListResponsive from '../../components/Product/ProductCardsListResponsive/ProductCardsListResponsive';
import LayoutBase from '../../components/LayoutBase/LayoutBase';

const TitleProducts = styled.div`
  display: grid;
  justify-content: center;
  padding: 4vh;
`;

const TitleH1 = styled.h1`
  text-align: center;
  font-size: 40px;
`;

const TitleH2 = styled.h2`
  text-align: center;
  font-size: 25px;
`;

const Content = styled.div``;

const Prods = styled.div``;

const PaginationProducts = styled.div`
  width: 100%;
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PaginationButton = styled.button`
  background-color: ${(props: { active?: boolean; disabled?: boolean }) =>
    props.active ? '#4caf50' : props.disabled ? '#f1f1f1' : '#f1f1f1'};
  color: ${(props: { active?: boolean; disabled?: boolean }) => (props.active ? 'white' : 'black')};
  border: 1px solid #ddd;
  padding: 8px 16px;
  text-decoration: none;
  cursor: ${(props: { active?: boolean; disabled?: boolean }) =>
    props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${(props: { active?: boolean; disabled?: boolean }) => (props.disabled ? 0.5 : 1)};

  &:hover:not([disabled]):not([active]) {
    background-color: #ddd;
  }
`;

const Products = (props: IProductPageProps) => {
    const [totalPages, setTotalPages] = useState<number>(1);
    const [products, setProducts] = useState<IProductProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const params = useParams<{ brand?: string }>();
    const brand = params.brand;
    const prevProps = useRef<IProductPageProps | null>(null);
    const prevPage = useRef<any | null>(null);


    useEffect(() => {
        const shouldFetchProducts = () => {
            if (!prevProps.current) return true;
            return (
                prevProps.current.id !== props.id ||
                prevProps.current.name !== props.name ||
                prevProps.current.description !== props.description ||
                prevProps.current.elementsSize !== props.elementsSize ||
                prevProps.current.productId !== props.productId ||
                page !== prevPage.current
            );
        };

        if (shouldFetchProducts()) {
            console.log('useEffect llamado');
            const fetchProducts = async () => {
                setLoading(true);
                const result = brand
                    ? await getProductsFromBrand({ ...props, name: brand, pagination: page })
                    : await getProductsFromCategory({ ...props, pagination: page });

                setTotalPages(Math.ceil(result.totalItems / props.elementsSize));
                setProducts(result.products.sort((a, b) => a.name.localeCompare(b.name)));
                setLoading(false);
            };

            fetchProducts();
        }

        prevProps.current = props;
        prevPage.current = page;
    }, [page, brand, props]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <LayoutBase layoutWithMenuBars={true}>
            <AnimatedPage className={'s22'}>
                <TitleProducts>
                    <TitleH1>CATALOGO DE {props.name}</TitleH1>
                    <TitleH2>{props.description}</TitleH2>
                </TitleProducts>
                <Content>
                    <Prods>
                        <ProductCardsListResponsive products={products} />
                    </Prods>
                        <PaginationProducts>
                            <PaginationButton
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 0}
                            >
                                &laquo; Anterior
                            </PaginationButton>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationButton
                                    key={index}
                                    onClick={() => handlePageChange(index)}
                                    active={index === page}
                                >
                                    {index + 1}
                                </PaginationButton>
                            ))}
                            <PaginationButton
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages - 1}
                            >
                                Siguiente &raquo;
                            </PaginationButton>
                        </PaginationProducts>

                </Content>
            </AnimatedPage>
        </LayoutBase>
    );
};

export default Products;
