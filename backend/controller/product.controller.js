import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../model/product.model.js";

export const getAllProducts = async (req, res) => {
  const product = await Product.find({});
  res.json({ product });
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProduct = await redis.get("featured_Products");
    if (featuredProduct) {
      return res.status(200).json(JSON.parse(featuredProduct));
    }
    featuredProduct = await Product.find({ isFeatured: true }).lean();

    if (!featuredProduct) {
      return res.status(403).json({ message: "No featured product found." });
    }

    await redis.set("featured_Products", JSON.stringify(featuredProduct));
  } catch (error) {
    console.log("Error in featured prodcut controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, image, price, category } = req.body;
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : " ",
    });

    res.status(201).json({ product });
  } catch (error) {
    console.log("Error in createProduct controller ", error.message);
    res.status(500).json({ message: "Server Error ", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];

      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Deleted image from cloudinary sucessfully");
      } catch (error) {
        console.log(
          "Error while deleting image from cloudinary ",
          error.message
        );
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted sucessfully" });
  } catch (error) {
    console.log("Error in DeleteProduct controller ", error.message);
    res.status(500).json({ message: "Server Error ", error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const prodcuts = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          description: 1,
          image: 1,
        },
      },
    ]);
    res.json({ prodcuts });
  } catch (error) {
    console.log("Error in getRecommendedProduct controller ", error.message);
    res.status(500).json({ message: "Server Error ", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const prodcuts = await Product.find({ category });
    res.status(200).json(prodcuts);
  } catch (error) {
    console.log("Error in getProductsByCategory controller ", error.message);
    res.status(500).json({ message: "Server Error ", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await Product.save();
      await updateFeaturedProductInCache();
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    console.log("Error in getProductsByCategory controller ", error.message);
    res.status(500).json({ message: "Server Error ", error: error.message });
  }
};


async function updateFeaturedProductInCache(params) {
  try {
    const products = await Product.find({isFeatured:true}).lean();
    await redis.set("featured_Products",JSON.stringify(products))
  } catch (error) {
    console.log(`Error while updating the cache of the redis in toggleFeature controller ${error.message}`)
  }
}