import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button, Alert, Image } from 'react-bootstrap'


const CartPage = ({ match, location, history }) => {


  const basketItems = JSON.parse(localStorage.getItem("cartItem") || "[]");
  console.log(basketItems);
  useEffect(() => {
  }, [basketItems]);

  //Total Beans Quantity
  const beanQty = Array.from(basketItems.reduce(
    (m, { name, qty }) => m.set(name, (m.get(name) || 0) + qty), new Map()
  ), ([name, qty]) => ({ name, qty }));
  console.log(beanQty);
  const totalBeansQty = beanQty.find(beans => beans.name === "Tin of beans") || 0
  console.log(totalBeansQty.qty || 0);

  //Total Cola Quantity
  const colaQty = Array.from(basketItems.reduce(
    (m, { name, qty }) => m.set(name, (m.get(name) || 0) + qty), new Map()
  ), ([name, qty]) => ({ name, qty }));
  console.log(colaQty);
  const totalColaQty = colaQty.find(beans => beans.name === "Can of cola") || 0
  console.log(totalColaQty.qty);

  const clearBasketHandler = () => {
    localStorage.removeItem("cartItem");
    window.location.reload();
  }


  const checkoutHandler = () => {
    history.push('/confirm')
  }
  const shopMore = () => {
    history.push('/')
  }

  return (
    <Row>
      <Col md={8}>
        <h2>Super Market Cart</h2>
        {basketItems.length === 0 ?
          <Alert variant="danger">
            <Alert.Heading>Your Basket is Empty</Alert.Heading>
            <p>
              <Link to="/">Go Back</Link>
            </p>
          </Alert> : (
            <ListGroup variant="flush">
              {basketItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.productId}`}>{item.name} </Link>
                      {item.name === "Oranges" && <small> 0.195 kg @ £1.99/kg</small>}
                    </Col>
                    <Col md={2}>£{item.price.toFixed(2)}</Col>

                    <Col md={2}>{item.qty}</Col>

                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({basketItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h2>
              <hr />
              <h6>
                Subtotal Price:  £{basketItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </h6>
              <hr />
              <h5>
                Savings:
                {totalBeansQty.qty >= 3 &&
                  <>
                    <br />
                    <small className="my-3">Beans 3 for 2 :
                      - £{(totalBeansQty.qty / 3 * 2 - totalBeansQty.qty * 0.5).toFixed(2)}
                    </small>
                  </>
                }
                {totalColaQty.qty >= 2 &&
                  <>
                    <br />
                    <small className="my-3">Cola 2 for £1 :
                      - £{(totalColaQty.qty * 0.7 - totalColaQty.qty / 2 * 1).toFixed(2)}
                    </small>
                  </>
                }
              </h5>
              {totalColaQty.qty >= 2 && totalBeansQty.qty >= 3 &&
                <>
                  <hr />

                  <h5>Total Savings: <span></span>
                    <small>- £{(totalBeansQty.qty / 3 * 2 - totalBeansQty.qty * 0.5 + totalColaQty.qty * 0.7 - totalColaQty.qty / 2 * 1).toFixed(2)}</small>
                  </h5>
                </>

              }
              <hr />
              {totalColaQty.qty >= 2 && totalBeansQty.qty >= 3 ? (
                <h5>Total To Pay:
                  <small> £{(basketItems.reduce((acc, item) => acc + item.qty * item.price, 0) - (totalBeansQty.qty / 3 * 2 - totalBeansQty.qty * 0.5 + totalColaQty.qty * 0.7 - totalColaQty.qty / 2 * 1) || 0).toFixed(2)}</small>
                </h5>
              ) : totalBeansQty.qty && totalBeansQty.qty >= 3 ? (
                <h5>Total To Pay:
                  <small> £{(basketItems.reduce((acc, item) => acc + item.qty * item.price, 0) - (totalBeansQty.qty / 3 * 2 - totalBeansQty.qty * 0.5) || 0).toFixed(2)}</small>
                </h5>
              )
                : totalColaQty.qty && totalColaQty.qty >= 2 ? (
                  <h5>Total To Pay:
                    <small> £{(basketItems.reduce((acc, item) => acc + item.qty * item.price, 0) - (totalColaQty.qty * 0.7 - totalColaQty.qty / 2 * 1) || 0).toFixed(2)}</small>
                  </h5>
                ) : (
                  <h6>
                    Total Price:  £{basketItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </h6>
                )
              }

            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block btn-success me-1"
                onClick={checkoutHandler}
              >
                Confirm
              </Button>

              <Button
                type="button"
                className="btn-block btn-secondary ms-1"
                onClick={clearBasketHandler}
              >
                Clear Basket
              </Button>
              <Button
                type="button"
                className="btn-block  ms-1"
                onClick={shopMore}
              >
                Add More
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartPage
