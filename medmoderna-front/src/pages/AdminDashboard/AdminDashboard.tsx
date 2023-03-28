import React, { useState, useEffect } from "react";
import { IProductProps } from "../../models/IProductProps";
import "./AdminDashboard.css";
import { deleteProduct, getAllProducts, postProduct, editProduct } from "../../services/api-products-service";
import ProductCardNewHome from "../../components/Product/ProductCardNew/ProductCardNew";
import 'react-toastify/dist/ReactToastify.css';
import ExcelUploader from "../../components/ExcelUploader/ExcelUploader";
import {useAuth} from "../../Auth/AuthContext";
import LayoutBase from "../../components/LayoutBase/LayoutBase";
import ProductCardNew from "../../components/Product/ProductCardNew/ProductCardNew";

const AdminDashboard: React.FC = () => {
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
    const [products, setProducts] = useState<IProductProps[]>([]);
    const [page, setPageNumber] = useState<number>(0);
    const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());
    const [editedProduct, setEditedProduct] = useState<IProductProps | null>(null);
    // New product form state
    const [newProductName, setNewProductName] = useState<string>('');
    const [newProductImgSrc, setNewProductImgSrc] = useState<string>('');
    const [newProductImgSrc2, setNewProductImgSrc2] = useState<string>('');
    const [newProductDescription, setNewProductDescription] = useState<string>('');
    const [newProductBrand, setNewProductBrand] = useState<string>('');
    const [newProductCategory, setNewProductCategory] = useState<string>('');
    const [newProductPrice, setNewProductPrice] = useState<number>(0);

    const handleSubmitNewProduct = async (event: any) => {
        event.preventDefault();
        const newProduct: IProductProps = {
            productId: 0, // This should be updated with a correct ID assignment
            brand: newProductBrand,
            category: newProductCategory,
            description: newProductDescription,
            imgSrc: newProductImgSrc,
            imgSrc2: newProductImgSrc2,
            name: newProductName,
            price: newProductPrice,
        };
        //await postProduct(newProduct);
        alert('A new product was submitted: ' + newProductName);

        setProducts([...products, newProduct]);
    };
    const [newProduct, setNewProduct] = useState<IProductProps>({
        brand: "",
        category: "",
        description: "",
        imgSrc: "",
        imgSrc2: "",
        name: "",
        price: 0,
        productId: 0,
    });

    const [imageType, setImageType] = useState("url");
    const { token } =   useAuth();

    if (!token) {
       // return <p>Debes iniciar sesión para ver este contenido.</p>;
    }

    const toggleImageType = () => {
        setImageType(imageType === "url" ? "file" : "url");
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const allProducts = await getAllProducts({ page:0, size: 100 });
        setProducts(allProducts);
    };

    const handleDelete = async (product: IProductProps) => {
        await deleteProduct(product.productId.toString());
        loadData();
    };

    const handleProductSelection = (productId: number, isSelected: boolean) => {
        setSelectedProducts((prevSelectedProducts) => {
            const updatedSelectedProducts = new Set(prevSelectedProducts);
            if (isSelected) {
                updatedSelectedProducts.add(productId);
            } else {
                updatedSelectedProducts.delete(productId);
            }
            return updatedSelectedProducts;
        });
    };

    const handleBulkDelete = async () => {
        for (const productId of selectedRowIds) {
            await deleteProduct(productId.toString());
        }
        loadData();
    };

    const handleEdit = (product: IProductProps) => {
        setEditingProductId(product.productId);
    };

    const handleConfirmEdit = async (product: IProductProps) => {
        await editProduct(product.productId.toString(), product);
        setEditingProductId(null);
        loadData();
    };

    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editedProduct) {
            await editProduct(editedProduct.productId.toString(), editedProduct);
            setEditedProduct(null);
            loadData();
        }
    };

    const handleNewProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //await postProduct(newProduct);
        loadData();
    };

    const handleRowSelection = (productId: number) => {
        const newSelectedRowIds = new Set(selectedRowIds);
        if (selectedRowIds.has(productId)) {
            newSelectedRowIds.delete(productId);
        } else {
            newSelectedRowIds.add(productId);
        }
        setSelectedRowIds(newSelectedRowIds);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setNewProduct({ ...newProduct, imgSrc: reader.result });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    function setPage(number: number) {
        setPageNumber(number)
        loadData()
    }

    return (
        <LayoutBase>
            <div className="admin-dashboard glass">
                <h1>Panel de administración</h1>
                <div className="form-and-preview">
                    <div className="form-container">
                        <h2>Agregar nuevo producto</h2>

                        <form onSubmit={handleSubmitNewProduct}>
                            <div className="form-group">
                                <label htmlFor="newProductName">Name:</label>
                                <input
                                    id="newProductName"
                                    type="text"
                                    value={newProductName}
                                    onChange={(event) => setNewProductName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newProductImgSrc">Image URL:</label>
                                <button type="button" onClick={toggleImageType}>
                                    Alternar a {imageType === "url" ? "Archivo" : "URL"}
                                </button>
                                {imageType === "url" ? (
                                    <input
                                        type="text"
                                        id="imgSrc"
                                        value={newProduct.imgSrc}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, imgSrc: e.target.value })
                                        }
                                    />
                                ) : (
                                    <input
                                        type="file"
                                        id="imgSrc"
                                        accept="image/*"
                                        onChange={(e) =>handleImageUpload(e)}
                                    />
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="newProductDescription">Description:</label>
                                <textarea
                                    id="newProductDescription"
                                    value={newProductDescription}
                                    onChange={(event) => setNewProductDescription(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newProductBrand">Brand:</label>
                                <input
                                    id="newProductBrand"
                                    type="text"
                                    value={newProductBrand}
                                    onChange={(event) => setNewProductBrand(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newProductCategory">Category:</label>
                                <input
                                    id="newProductCategory"
                                    type="text"
                                    value={newProductCategory}
                                    onChange={(event) => setNewProductCategory(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newProductPrice">Price:</label>
                                <input
                                    id="newProductPrice"
                                    type="number"
                                    value={newProductPrice}
                                    onChange={(event) => setNewProductPrice(parseFloat(event.target.value))}
                                />
                            </div>
                            <button type="submit">Create Product</button>
                        </form>
                    </div>

                    <div className="preview-container">
                        <ProductCardNew
                            key={newProductName}
                            imgSrc={newProductImgSrc}
                            imgSrc2={newProductImgSrc2}
                            description={newProductDescription}
                            price={newProductPrice}
                            productId={0}
                            name={newProductName}
                            brand={newProductBrand}
                            category={newProductCategory}
                            maxLines={3}
                            maxCharsPerLine={90}
                         index={0} blur={"10px"}/>
                    </div>
                </div>
                <div className={"table-container"}>
                    <table className="product-table glass">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Imagen 1</th>
                            <th>Imagen 2</th>
                            <th>Descripción</th>
                            <th>Acciones</th>

                        </tr>
                        </thead>

                        <tbody>
                        {products.map((product) => {
                            const isEditing = product.productId === editingProductId;
                            return (
                                <tr key={product.productId}>
                                    <td>{product.productId}</td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={product.name}
                                                onChange={(e) =>
                                                    setProducts(
                                                        products.map((p) =>
                                                            p.productId === product.productId
                                                                ? { ...p, name: e.target.value }
                                                                : p
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            product.name
                                        )}
                                    </td>
                                    {/* Agrega inputs para las otras celdas que deseas que sean editables */}
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={product.category}
                                                onChange={(e) =>
                                                    setProducts(
                                                        products.map((p) =>
                                                            p.productId === product.productId
                                                                ? { ...p, category: e.target.value }
                                                                : p
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            product.category
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={product.brand}
                                                onChange={(e) =>
                                                    setProducts(
                                                        products.map((p) =>
                                                            p.productId === product.productId
                                                                ? { ...p, brand: e.target.value }
                                                                : p
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            product.brand
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                value={product.price}
                                                onChange={(e) =>
                                                    setProducts(
                                                        products.map((p) =>
                                                            p.productId === product.productId
                                                                ? { ...p, price: parseFloat(e.target.value) }
                                                                : p
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            product.price
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={product.imgSrc}
                                                onChange={(e) =>
                                                    setProducts(
                                                        products.map((p) =>
                                                            p.productId === product.productId
                                                                ? { ...p, imgSrc: e.target.value }
                                                                : p
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            <>

                                                        <img src={`${product.imgSrc}`} alt={product.name} style={{ maxWidth: "50px" }}  />

                                            </>

                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={product.imgSrc2






                                            }
                                                onChange={(e) =>
                                                    setProducts(
                                                        products.map((p) =>
                                                            p.productId === product.productId
                                                                ? { ...p, imgSrc2: e.target.value }
                                                                : p
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            <>
                                                        <img src={`${product.imgSrc2}`} alt={product.name} style={{ maxWidth: "50px" }}  />
                                            </>

                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <textarea
                                                value={product.description}
                                                onChange={(e) =>
                                                    setProducts(
                                                        products.map((p) =>
                                                            p.productId === product.productId
                                                                ? { ...p, description: e.target.value }
                                                                : p
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            product.description
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <>
                                                <button onClick={() => handleConfirmEdit(product)}>Confirmar</button>
                                                <button onClick={() => setEditingProductId(0)}>Cancelar</button>
                                            </>

                                        ) : (
                                            <button onClick={() => handleEdit(product)}>Editar</button>
                                        )}
                                        <button onClick={() => handleDelete(product)}>Eliminar</button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    <h3>Página {page}</h3>
                    <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                        Anterior
                    </button>
                    <button onClick={() => setPage(page + 1)} disabled={products.length < 10}>
                        Siguiente
                    </button>

                </div>
                <button onClick={handleBulkDelete}>Eliminar seleccionados</button>
                {editedProduct && (
                    <>
                        <h2>Editar producto</h2>
                        <form onSubmit={handleUpdateProduct}>
                            <label htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                value={editedProduct.name}
                                onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, name: e.target.value })
                                }
                            />

                            <label htmlFor="imgSrc">Imagen:</label>
                            <button type="button" onClick={toggleImageType}>
                                Alternar a {imageType === "url" ? "Archivo" : "URL"}
                            </button>

                            {imageType === "url" ? (
                                <input
                                    type="text"
                                    id="imgSrc"
                                    value={editedProduct.imgSrc}
                                    onChange={(e) =>
                                        setEditedProduct({ ...editedProduct, imgSrc: e.target.value })
                                    }
                                />
                            ) : (
                                <input
                                    type="file"
                                    id="imgSrc"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                if (typeof reader.result === 'string') {
                                                    setEditedProduct({ ...editedProduct, imgSrc: reader.result });
                                                }
                                            };
                                            reader.readAsDataURL(e.target.files[0]);
                                        }
                                    }}
                                />
                            )}
                            <label htmlFor="description">Descripción:</label>
                            <textarea
                                id="description"
                                value={editedProduct.description}
                                onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, description: e.target.value })
                                }
                            />

                            <label htmlFor="category">Categoría:</label>
                            <input
                                type="text"
                                id="category"
                                value={editedProduct.category}
                                onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, category: e.target.value })
                                }
                            />

                            <label htmlFor="brand">Marca:</label>
                            <input
                                type="text"
                                id="brand"
                                value={editedProduct.brand}
                                onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, brand: e.target.value })
                                }
                            />

                            <label htmlFor="price">Precio:</label>
                            <input
                                type="number"
                                id="price"
                                value={editedProduct.price}
                                onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })
                                }
                            />

                            <button type="submit">Actualizar producto</button>
                            <button type="button" onClick={() => setEditedProduct(null)}>
                                Cancelar
                            </button>
                        </form>
                    </>
                )}
                <ExcelUploader/>
            </div>
        </LayoutBase>
    );
};

export default AdminDashboard;
