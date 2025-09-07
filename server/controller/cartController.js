import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";

// ➕ Add to cart
export const addToCart = async (req, res) => {
  const { userId, foodId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const food = await foodModel.findById(foodId);
    if (!food) return res.json({ success: false, message: "Food not found" });

    const existingItem = user.cart.find(
      (item) => item.foodId.toString() === foodId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ foodId, quantity: 1 });
    }

    await user.save();
    res.json({ success: true, message: "Item added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➖ Remove from cart
export const removeFromCart = async (req, res) => {
  const { userId, foodId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const itemIndex = user.cart.findIndex(
      (item) => item.foodId.toString() === foodId
    );

    if (itemIndex > -1) {
      if (user.cart[itemIndex].quantity > 1) {
        user.cart[itemIndex].quantity -= 1;
      } else {
        user.cart.splice(itemIndex, 1);
      }
      await user.save();
      res.json({ success: true, message: "Item removed", cart: user.cart });
    } else {
      res.json({ success: false, message: "Item not in cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🛒 Get user cart
export const getCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId).populate("cart.foodId");
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
