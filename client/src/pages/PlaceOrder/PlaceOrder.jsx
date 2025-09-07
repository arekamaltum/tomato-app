import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./PlaceOrder.css";

// ✅ Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  address: Yup.string().required("Delivery address is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  payment: Yup.string().required("Please select a payment method"),
});

const PlaceOrder = () => {
  return (
    <div className="placeorder">
      <h2>Place Your Order</h2>

      <Formik
        initialValues={{
          name: "",
          address: "",
          phone: "",
          pincode: "",
          payment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Order Placed:", values);
          alert("Order placed successfully!");
          resetForm();
        }}
      >
        {() => (
          <Form className="placeorder-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <Field as="textarea" id="address" name="address" rows="3" />
              <ErrorMessage name="address" component="div" className="error" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <Field type="text" id="phone" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <Field type="text" id="pincode" name="pincode" />
                <ErrorMessage
                  name="pincode"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <div className="radio-group">
                <label>
                  <Field type="radio" name="payment" value="COD" />
                  Cash on Delivery
                </label>
                <label>
                  <Field type="radio" name="payment" value="UPI" />
                  UPI
                </label>
                <label>
                  <Field type="radio" name="payment" value="Card" />
                  Debit/Credit Card
                </label>
              </div>
              <ErrorMessage name="payment" component="div" className="error" />
            </div>

            <button type="submit" className="submit-btn">
              Confirm Order
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PlaceOrder;

