import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import "@aws-amplify/ui-react/styles.css";
import { getOrderByUserId } from "../graphql/queries";
import { currentAuthenticatedUser } from "../utils/util";
import { OrderItem } from "../API";
const client = generateClient();

function OrderList() {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const getOrders = async () => {
    try {
      const user= await currentAuthenticatedUser();
      console.log(user);
      const userId = user?.userId?user.userId:'';
      const result = await client.graphql({
        query: getOrderByUserId,
        variables: {
            userId:userId
        },
      });
      if (result.data.getOrderByUserId.orderItems) {
        setOrders(result.data.getOrderByUserId.orderItems as OrderItem[]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message); // Accessing the error message safely
      } else {
        console.log("An unknown error occurred:", err);
      }
    }
  };
  useEffect(() => {
  getOrders();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-center">
        {/* <h2>Posts</h2> */}
        <div className="table-responsive">
        <table className="table  table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">BookId</th>
              <th scope="col">Quantity</th>
              <th scope="col">OrderId</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, key) => (
              <tr key = {key}>
                <th scope="row">{key+1}</th>
                <td>{order.bookId}</td>
                <td>{order.quantity}</td>
                <td>{order.orderId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
