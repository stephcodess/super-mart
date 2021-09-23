import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const ConfirmPage = ({ history }) => {

  const clearBasketHandler = () => {
    localStorage.removeItem("cartItem");
    history.push('/')
  }
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <div className="card">

              <div className="invoice p-5">
                <h5>Order Receipt!</h5> <span className="font-weight-bold d-block mt-4">Hello, Sir</span> <span>Here is the receipt of your order!</span>
                <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <div className="py-2"> <span className="d-block text-muted">Order Date</span> <span>12 Sept,2021</span> </div>
                        </td>
                        <td>
                          <div className="py-2"> <span className="d-block text-muted">Order No</span> <span>K1128965345</span> </div>
                        </td>
                        <td>
                          <div className="py-2"> <span className="d-block text-muted">Payment</span> <span><img src="https://img.icons8.com/color/48/000000/mastercard.png" width="20" /></span> </div>
                        </td>
                        <td>
                          <div className="py-2"> <span className="d-block text-muted">Shiping Address</span> <span>97  Bath Rd, WOODFORD,UK</span> </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="font-weight-bold mb-0">Thanks for shopping with us!</p>
              </div>
              <div className="d-flex justify-content-between footer p-3">
                <Button onClick={clearBasketHandler} className="btn btn-dark my-5" to="/">Back to Home Page</Button>
                <span>13 September, 2021</span> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPage
