"use client"
import React, { useState, useEffect } from "react";
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios'; 
import "./Style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [productCategories, setProductCategories] = useState([]);
  const [customerWithCountry, setCustomerWithCountry] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const adminResponse = await axios.get('http://localhost:2001/admincount', { withCredentials: true });
      const customerResponse = await axios.get('http://localhost:2001/customercount', { withCredentials: true });
      const categoryProductQtySumResponse = await axios.get('http://localhost:2001/CategoryProductQtySum', { withCredentials: true });
      const customerWithCountryResponse = await axios.get('http://localhost:2001/CustomerCountByCountry', { withCredentials: true });

      setAdminCount(adminResponse.data.adminCount);
      setCustomerCount(customerResponse.data.customerCount);
      setProfit(customerResponse.data.profit);
      setProductCategories(categoryProductQtySumResponse.data);
      setCustomerWithCountry(customerWithCountryResponse.data);

    } catch (error) {
      toast.error("Your session expire.Please Sign out & Sign in again");
    }
  };

  const customerCountryPieOptions = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
        text: "Customer Count by Country"
    },
    data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}",
        dataPoints: customerWithCountry.map(countryData => ({
          y: countryData.customerCount,
          label: countryData.country
        }))
    }]
  };

  const formattedData = productCategories.map(category => ({
    label: category.category,
    y: category.productQtySum
  }));

  const categoryColumnOptions = {
    title: {
      text: "Category Product Quantity Sum"
    },
    data: [
      {
        type: "column",
        dataPoints: formattedData
      }
    ]
  };
  
  return (
    <>
      <div className="dashboard-container">
        <div className="box">
          <h2>Admins</h2>
          <p>{adminCount}</p>
        </div>
        <div className="box">
          <h2>Customers</h2>
          <p>{customerCount}</p>
        </div>
        <div className="box">
          <h2>Profit</h2>
          <p>{profit}</p>
        </div>
      </div>
      <div className="chart-container">
        <div className="column-chart">
          <CanvasJSChart options={categoryColumnOptions} />
        </div>
        <div className="pie-chart">
          <CanvasJSChart options={customerCountryPieOptions} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Graph;
