import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import products from '../products'

const ProductPage = ({ match, history }) => {

  const [qty, setQty] = useState(1)

  const product = products.find(product => product._id === match.params.id)



  const addItemToCart = () => {

    const list = JSON.parse(localStorage.getItem("cartItem") || "[]");

    // Get the name and price
    var item = {
      productId: product._id,
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      number_of_available_items: product.number_of_available_items,
      qty: Number(qty)
    };


    // Add to the list
    list.push(item);

    // Update local storage
    localStorage.setItem("cartItem", JSON.stringify(list));

    history.push(`/cart/${match.params.id}?qty=${qty}&product_name=${product.name}`)
  }
  return (
    <>
      <Link className="btn btn-dark my-5" to="/">Go Back</Link>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} height="400" width="400" />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>{product.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: £{product.price.toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>£{product.price.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.number_of_available_items > 0 && (

                <ListGroup.Item>
                  <Row>
                    <Col>
                      Item Quantity:
                    </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}>
                        {

                          [...Array(product.number_of_available_items).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))
                        }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block btn-success"
                  type="button"
                  onClick={addItemToCart}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductPage
