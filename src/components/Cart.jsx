import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Cart({
  data,
  cart,
  handleDelete,
  setUpdateQuantity,
  handleUpdate,
  updateQuantity,
}) {
  const totalPrice = cart.reduce((total, cartItem) => {
    const product = data.find((product) => product.id === cartItem.id);
    if (product) {
      const productPrice = parseFloat(product.price);
      return total + productPrice * cartItem.quantity;
    }
    return total;
  }, 0);

  return (
    <div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>IMAGE</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>TotalAmount</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((e, i) => {
            const findProduct = data.find((product) => e.id === product.id);
            if (!!findProduct) {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{findProduct.name}</td>
                  <td>
                    <img width={"50px"} src={findProduct.image_url} alt="" />
                  </td>
                  <td>
                    <input
                      className="update-inp"
                      type="number"
                      name=""
                      id=""
                      defaultValue={e.quantity}
                      onChange={(e) => setUpdateQuantity(e.target.value)}
                    />
                  </td>
                  <td>{findProduct.price}</td>
                  <td>{+findProduct.price * e.quantity}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleUpdate(findProduct.id)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(findProduct.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            }
          })}
          <tr>
            <td className="total" colSpan={8}>
              Tổng tiền: {totalPrice} $
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
