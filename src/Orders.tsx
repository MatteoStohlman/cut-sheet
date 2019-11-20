import * as React from "react";
import fire from "./fire";

export const Orders = () => {
  const orders = fire.database().ref("orders");
  orders.on("value", snapshot => console.log(snapshot.val()));
  orders.once("value").then(snapshot => {
    console.log(snapshot.val());
  });
  return <div>done!</div>;
};

export default Orders;
