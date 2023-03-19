import React, { useState, useEffect } from "react";
import { IProductProps } from "../../models/IProductProps";
import "./AdminDashboard.css";
import { deleteProduct, getAllProducts, postProduct, editProduct } from "../../services/api-products-service";

const AdminDashboard: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
    const [products, setProducts] = useState<IProductProps[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());
    const [editedProduct, setEditedProduct] = useState<IProductProps | null>(null);
    const [newProduct, setNewProduct] = useState<IProductProps>({
        brand: "",
        category: "",
        description: "",
        imgSrc: "",
        name: "",
        price: 0,
        productId: 0,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        alert(JSON.stringify(allProducts, null, 2));
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
        setEditedProduct(product);
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
        await postProduct(newProduct);
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

    return (
        <div className="admin-dashboard">
            <h1>Panel de administración</h1>
            <table className="product-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.productId}>
                        <td>{product.productId}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>{product.price}</td>
                        <td>
                            <button onClick={() => handleEdit(product)}>Editar</button>
                            <button onClick={() => handleDelete(product)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleBulkDelete}>Eliminar seleccionados</button>
            <h2>Agregar nuevo producto</h2>
            <form onSubmit={handleNewProductSubmit}>
                {/* Agregar campos de entrada para los atributos del nuevo producto */}
                <button type="submit">Agregar producto</button>
            </form>
            {editedProduct && (
                <>
                    <h2>Editar producto</h2>
                    <form onSubmit={handleUpdateProduct}>
                        {/* Agregar campos de entrada para los atributos del producto editado */}
                        <button type="submit">Actualizar producto</button>
                        <button type="button" onClick={() => setEditedProduct(null)}>
                            Cancelar
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;

