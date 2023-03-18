import React from 'react';
import './ProductCardsListResponsive.css';
import {IProductProps} from "../../../models/IProductProps";
import logo from '../../../assets/logo4.png';
import Modal from 'react-modal';
import ProductCardDetail from "../ProductCardDetail";
import ProductCardDetailResponsive from '../ProductCardDetailResponsive/ProductCardDetailResponsive';


type ProductCardsListResponsiveProps = {
    products: IProductProps[];
}


const ProductCardsListResponsive: React.FC<ProductCardsListResponsiveProps> = ({ products }) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    Modal.setAppElement('#root');

    const customStyles = {
        content: {
            overflow: "hidden",
            display: "flex",
            alignContent: "center",
            alignItems:"center",
            top: "20vh",
            left: "10vw",
            width: "85vw",
            height: "100%"
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className="shopping-list">
            {products.map(item => (


                <div key={item.productId} className="shopping-item">
                    <img src={logo} className={"imageContainer"} alt={ "logo"}/>

                    <img src={`data:image/png;base64,${item.imgSrc}`} alt={item.name} className="item-image" />
                    <div className="item-details">
                        <div className="item-name">{item.name}</div>
                        <div className="item-price-and-button">
                            {/*@ts-ignore*/}
                            <div className="item-price" ><p className="card-price">{item.price.toFixed(2)}€</p></div>
                            <button className="item-button"  onClick={openModal} ><i className="gg-info"></i></button>
                        </div>
                    </div>
                    <div>
                        <Modal id={"modal"}
                               isOpen={modalIsOpen}
                               style={customStyles}
                               onAfterOpen={afterOpenModal}
                               onRequestClose={closeModal}
                               contentLabel="Example Modal"
                        >
                            <div>
                                <ProductCardDetailResponsive key={"1"} imgSrc={item.imgSrc} description={item.description} price={item.price} productId={(item.productId) ? item.productId.toString(): ""} name={item.name} brand={item.brand} category={"item.category"}/>
                            </div>
                        </Modal>

                    </div>
                </div>

            ))}
        </div>
    );
};

export default ProductCardsListResponsive;
