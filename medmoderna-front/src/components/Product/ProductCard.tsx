import {IProductProps} from "../../models/IProductProps";
import React from "react";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import ContentLoader from "react-content-loader";

const ProductCard = (props: IProductProps) => {

    return <>

        <div className="card" key="card">

            <div className="imgBox">
                <img
                    src={`${props.imgSrc}`}
                    alt="mouse corsair"/>
            </div>

            <div className="contentBox">
                <h3>{props.name || <Skeleton/>} </h3>
                <h2 className="price">{props.price}€</h2>
                <Link className="buy" to={`/product/${props.productId}`}> Ver Detalles </Link>
                <Link className="buy" to={`/edit/${props.productId}`}> Editar </Link>

            </div>

        </div>

    </>
};
export const ProductCardLoading = ({
                          width = 280,
                          row = 1,
                          column = 1,
                          padding = 0,
                          borderRadius = 20,
                          ...props
                      }) => {
    const list = []

    let height

    for (let i = 1; i <= row; i++) {
        for (let j = 0; j < column; j++) {
            const itemWidth = (width - padding * (column + 1)) / column

            const x = padding + j * (itemWidth + padding)

            const height1 = 340

            const height2 = 20

            const height3 = 20

            const space =
                padding + height1 + (padding / 2 + height2) + height3 + padding * 4

            const y1 = padding + padding * 2 + space * (i - 1)

            const y2 = y1 + padding + height1

            const y3 = y2 + padding / 2 + height2

            list.push(
                <>
                    <rect
                        x={x}
                        y={y1}
                        rx={borderRadius}
                        ry={borderRadius}
                        width={itemWidth}
                        height={height1}
                    />

                </>
            )

            if (i === row) {
                height = y3 + height3
            }
        }
    }

    return (
        <ContentLoader
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            {...props}
        >


            {list}
        </ContentLoader>
    )
}

export const ProductCardPreview = (props: IProductProps) => {
    let imageSource;
    console.log({propsPrev: props})
    if (props.imgSrc.startsWith("http")) {
        imageSource = props.imgSrc;
    } else {
        imageSource = `${props.imgSrc}`
    }
    return <>

        <div className="card" key="card">

            {(props.imgSrc.length < 1) ? <div className="imgBox">
                <img
                    src={`https://static.wixstatic.com/media/ca863c_8922c3cdc76f4d51bcaaeac397b9e09e~mv2.png/v1/fit/w_500,h_500,q_90/file.png`}
                    alt="No imagen"/>
            </div> : <div className="imgBox">
                <img
                    src={`${imageSource}`}
                    alt="No imagen"/>
            </div>}


            <div className="contentBox">
                <h3>{props.name}</h3>
                <h2 className="price">{props.price}€</h2>
                <div className="buy"> Ver Detalles</div>
                <div className="buy">Editar</div>
            </div>

        </div>

    </>
};

export default ProductCard;