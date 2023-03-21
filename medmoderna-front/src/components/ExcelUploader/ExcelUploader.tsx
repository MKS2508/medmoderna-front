import React, { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import './ExcelUploader.css'
import { Workbook } from 'exceljs';
import {toast} from "react-toastify";
import {postProduct} from "../../services/api-products-service";
import {IProductProps} from "../../models/IProductProps";


function uint8ArrayToBase64(uint8Array:any) {
    const CHUNK_SIZE = 8192; // 8KB
    let binaryString = '';

    for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
        const chunk = uint8Array.slice(i, i + CHUNK_SIZE);
        binaryString += String.fromCharCode.apply(null, chunk);
    }

    return btoa(binaryString);
}

const ExcelUploader: React.FC = () => {
    const [products, setProducts] = useState<IProductProps[]>([]);
    const readImagesFromXLSX = async (file: File): Promise<Array<{ rowNumber: number, img1: string, img2: string }>> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                if (e.target) {
                    const workbook = new Workbook();
                    const buffer = new Uint8Array(e.target.result as ArrayBuffer);
                    await workbook.xlsx.load(buffer);

                    const worksheet = workbook.getWorksheet('CBD');
                    const images: Array<{ rowNumber: number, img1: string, img2: string }> = [];

                    for (const image of worksheet.getImages()) {
                        const imageId = image.imageId;

                        if (imageId) {
                            const img = workbook.getImage( parseInt(imageId));
                            console.log({img: img.buffer})
                            if (img && img.buffer) {
                                const rowNumber = image.range.tl.nativeRow;
                                const base64String = uint8ArrayToBase64(img.buffer);
                                const base64Image = `data:png;base64,${base64String}`;

                                let rowImages = images.find(image => image.rowNumber === rowNumber);
                                if (!rowImages) {
                                    rowImages = { rowNumber, img1: '', img2: '' };
                                    images.push(rowImages);
                                }

                                if (!rowImages.img1) {
                                    rowImages.img1 = base64Image;
                                } else {
                                    rowImages.img2 = base64Image;
                                }
                            }
                        }
                    }
                    console.warn({images})
                    resolve(images);
                } else {
                    reject('No se pudo leer el archivo');
                }
            };
            reader.onerror = (e) => {
                reject('Error al leer el archivo');
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const imageData = await readImagesFromXLSX(file);

            const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
            const sheetName = workbook.SheetNames.find((name) => name === 'CBD');
            const sheet = workbook.Sheets[sheetName || ''];

            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as Array<any>;

            const productsArray: IProductProps[] = [];

            for (let index = 0; index < jsonData.length - 1; index++) {
                const row: any[] = jsonData[index + 1];
                if (row && row.length > 0) {
                    const imgData = imageData.find(img => img.rowNumber === index + 1);
                    const imgSrc = imgData ? imgData.img1 : '';
                    const imgSrc2 = imgData ? imgData.img2 : '';

                    const product: IProductProps = {
                        name: row[0],
                        price: row[1] ? row[1] : 0,
                        brand: row[2] && row[2].length > 0 ? row[2] : 'undefined',
                        category: 'CBD',
                        productId: index + Math.random() * 1001,
                        imgSrc: imgSrc,
                        imgSrc2: imgSrc2,
                        description: row[4] && row[4].length > 0 ? row[4] : 'undefined',
                    };
                    productsArray.push(product);
                }
            };

            console.warn(productsArray)
            setProducts(productsArray);
        }
    };
    const insertAllProducts = async () => {
        for (const product of products) {
            await createProduct(product);
        }
    };

    const createProduct = async (product: IProductProps) => {
        try {
            const createdProduct = await postProduct(product);
            toast("Producto creado", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(createdProduct);
        } catch (error) {
            toast("Error al crear producto", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error(error);
        }
    };

    return (
        <div className="uploadExcelContainer">
            <h2 className="title">Subir productos desde Excel</h2>
            <input
                className={"fileInput"}
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
            />
            <button onClick={insertAllProducts}>INSERTAR TODOS</button>
            <ul className={"productList"}>
                {products.map((product, index) => (
                    <li key={index} className={"productListItem"}>
                        <div className="productDetails">
                            <div>{product.name}</div>
                            <div>{product.price}</div>
                            <div>{product.brand}</div>
                            <div>{product.category}</div>
                        </div>
                        <div className="productImage">
                            <img src={product.imgSrc} alt={product.name} />
                            <img src={product.imgSrc2} alt={product.name} />
                        </div>
                        <button onClick={() => createProduct(product)}>CREAR PRODUCTO</button>
                    </li>
                ))}
            </ul>
        </div>
    );


};

export default ExcelUploader;
