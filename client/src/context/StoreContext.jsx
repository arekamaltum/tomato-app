import { createContext, useEffect, useState } from "react";
import axios from "axios"; // import axios
import { food_list as staticFoodList } from "../assets/assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitems, SetCartItems] = useState({});
  const url = "http://localhost:3333";
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState(staticFoodList);

  const addToCart = (itemId) => {
    if (!cartitems[itemId]) {
      SetCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      SetCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    SetCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const newCartItems = { ...prev };
        delete newCartItems[itemId];
        return newCartItems;
      }
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartitems) {
      if (cartitems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartitems[item];
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch food list and set token on mount
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
          setFoodList(response.data.data);
        } else {
          console.log("Error fetching food list");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFoodList();

    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const contextValue = {
    food_list: foodList,
    cartitems,
    SetCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    setToken,
    token,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
