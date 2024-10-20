import React from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Button, Accordion, Card } from 'react-bootstrap';
import adminStore from '../store/AdminStore';

const ProductTable = observer(() => {
    const handleDelete = async (id) => {
        await adminStore.deleteProduct(id);
    };

    const handleEdit = (product) => {
        // Logic for editing a product, e.g., opening a modal window for editing.
        console.log('Editing product:', product);
    };

    return (
        <Table bordered hover responsive>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created</th>
                <th>Rating</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Availability</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {adminStore.products.length === 0 ? (
                <tr>
                    <td colSpan="9">No products available.</td>
                </tr>
            ) : (
                adminStore.products.map((product) => (
                    <React.Fragment key={product.id}>
                        <tr>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{new Date(product.created).toLocaleDateString()}</td>
                            <td>{product.averageRating} ⭐</td>
                            <td>{product.category.name}</td>
                            <td>{product.brand.name}</td>
                            <td>{product.isAvailable ? 'Available' : 'Unavailable'}</td>
                            <td className="d-flex justify-content-end align-items-center">
                                <Button className="me-2" variant="warning" onClick={() => handleEdit(product)}>
                                    Edit
                                </Button>
                                <Button className="me-2" variant="danger" onClick={() => handleDelete(product.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="9">
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Models</Accordion.Header>
                                        <Accordion.Body>
                                            {product.models.map((model) => (
                                                <Card key={model.id} className="mb-2">
                                                    <Card.Body>
                                                        <h6>
                                                            Model: {model.name} - {model.color.name} - {model.price} ₽
                                                        </h6>
                                                        <p>Available: {model.isAvailable ? 'Yes' : 'No'}</p>
                                                        <p>Sizes:</p>
                                                        <ul>
                                                            {model.sizes.map((size) => (
                                                                <li key={size.id}>
                                                                    Size: {size.name} - Stock: {size.stockQuantity} -{' '}
                                                                    {size.isAvailable ? 'Available' : 'Unavailable'}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <p>Photos:</p>
                                                        <div className="d-flex flex-wrap">
                                                            {model.photos.map((photo) => (
                                                                <img
                                                                    key={photo.id}
                                                                    src={photo.url}
                                                                    alt={photo.fileName}
                                                                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Reviews ({product.commentsCount})</Accordion.Header>
                                        <Accordion.Body>
                                            {product.comments.map((comment) => (
                                                <Card key={comment.id} className="mb-2">
                                                    <Card.Body>
                                                        <p>{comment.text}</p>
                                                        <p>Rating: {comment.rating} ⭐</p>
                                                        <p>Date: {new Date(comment.created).toLocaleDateString()}</p>
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </td>
                        </tr>
                    </React.Fragment>
                ))
            )}
            </tbody>
        </Table>
    );
});

export default ProductTable;
