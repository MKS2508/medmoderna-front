import React, { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import './ExcelUploader.css'
import { Workbook } from 'exceljs';
import {toast} from "react-toastify";
import {handleError, postProduct} from "../../services/api-products-service";
import {IProductProps} from "../../models/IProductProps";

const handleOk = (message: string) => {
    toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            background: '#0a720a',
            color: '#ffffff',
            borderRadius: '5px',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        },
    });
    console.log('Success:', message);
};
const multipleOk = async (totalItems: number, processItem: (index: number) => Promise<void>) => {
    let progress = 0;

    const updateToast = (toastId: React.ReactText) => {
        const percentage = (progress / totalItems) * 100;
        toast.update(toastId, {
            render: `Procesando: ${progress} de ${totalItems} (${percentage.toFixed(1)}%)`,
            progress: percentage / 100,
        });
    };

    const toastId = toast('Iniciando proceso...', {
        progress: 0,
        autoClose: false,
        closeButton: false,
        draggable: false,
        pauseOnHover: false,
        position: 'top-center',
        style: {
            background: '#0a720a',
            color: '#ffffff',
            borderRadius: '5px',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        },
    });

    for (let i = 0; i < totalItems; i++) {
        await processItem(i);
        progress++;
        updateToast(toastId);
    }

    toast.dismiss(toastId);
    handleOk(`Proceso completado: ${totalItems} elementos procesados.`);
};


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
    const readImagesFromXLSX = async (file: File): Promise<Array<{ sheetName: string, rowNumber: number, img1: { base64: string, blob: Blob }, img2: { base64: string, blob: Blob } }>> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                if (e.target) {
                    const workbook = new Workbook();
                    const buffer = new Uint8Array(e.target.result as ArrayBuffer);
                    await workbook.xlsx.load(buffer);

                    const images: Array<{ sheetName: string, rowNumber: number, img1: { base64: string, blob: Blob }, img2: { base64: string, blob: Blob } }> = [];

                    workbook.eachSheet((worksheet, sheetId) => {
                        if (worksheet.actualRowCount >= 3) {
                            for (const image of worksheet.getImages()) {
                                const imageId = image.imageId;

                                if (imageId) {
                                    const img = workbook.getImage(parseInt(imageId));
                                    console.log({ img: img.buffer });

                                    if (img && img.buffer) {
                                        const rowNumber = image.range.tl.nativeRow;
                                        const base64String = uint8ArrayToBase64(img.buffer);
                                        const base64Image = `data:image/png;base64,${base64String}`;
                                        const blobImage = new Blob([img.buffer], { type: "image/png" });

                                        let rowImages = images.find(image => image.sheetName === worksheet.name && image.rowNumber === rowNumber);
                                        if (!rowImages) {
                                            rowImages = { sheetName: worksheet.name, rowNumber, img1: { base64: '', blob: new Blob() }, img2: { base64: '', blob: new Blob() } };
                                            images.push(rowImages);
                                        }

                                        if (rowImages.img1.base64 === '') {
                                            rowImages.img1.base64 = base64Image;
                                            rowImages.img1.blob = blobImage;
                                        } else {
                                            rowImages.img2.base64 = base64Image;
                                            rowImages.img2.blob = blobImage;
                                        }
                                    }
                                }
                            }
                        }
                    });

                    console.warn({ images });
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
                        productId: index + Math.floor(Math.random() * 10001),
                        imgSrc: imgData ? imgData.img1.base64 : '',
                        imgSrc2: imgData ? imgData.img2.base64 : '',
                        description: row[5] && row[5].length > 0 ? row[5] : 'undefined',
                        imgBlobSrc: imgData ? imgData.img1.blob : new Blob(),
                        imgBlobSrc2: imgData ? imgData.img2.blob : new Blob(),
                    };
                    productsArray.push(product);
                }
            };

            console.warn(productsArray)

            setProducts(productsArray);
        }
    };
    const insertAllProducts = async () => {
        const processProduct = async (index: number) => {
            await createProduct(products[index], true);
        };

        const totalItems = products.length;

        multipleOk(totalItems, processProduct)
            .then(() => console.log('Todos los productos han sido procesados'))
            .catch((error) => handleError(error));
    };




    const createProduct = async (product: IProductProps, isFromLoop?: boolean) => {
        try {
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("price", product.price.toString());
            formData.append("brand", product.brand);
            formData.append("category", product.category);
            formData.append("productId", product.productId.toString());
            formData.append("imgSrc", product.imgBlobSrc as Blob, 'imgSrc.png');
            //formData.append("imgSrc2", product.imgBlobSrc2, 'imgSrc2.png');
            formData.append("description", product.description);

            const createdProduct = await postProduct(formData);

            console.log(createdProduct);
            if (!isFromLoop) {
                handleOk('Producto creado correctamente.');
            }
        } catch (error) {
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
