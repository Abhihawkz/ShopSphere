export const getCardProducts = async (req, res) => {};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = req.user;

    const existingItem = user.cartItems.map((item) => item.id == productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();

    res.status(201).sjson(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems.filter((item) => item.id !== productId);
    }
    await user.save();

    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const {id:productId} = req.params;
    const {quantity} = req.body;
    const user = req.user;
    const existingItem = user.cartItems.map(item => item.id == productId);

    if(existingItem){
        if(quantity === 0){
            user.cartItems.filter(item => item.id !== productId);
            await user.save();
            return res.json(user.cartItems)
        }

        user.cartItems.quantity = quantity;
        await user.save();
        res.status(200).json(user.cartItems);
    }else{
        res.status(404).json({message:"Product not found"})
    }


  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
