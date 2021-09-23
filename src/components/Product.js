import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.description} width={200} height={200} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
        </Link>

        <Card.Text as="h4">£{product.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
