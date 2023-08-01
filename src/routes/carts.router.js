import { Router } from "express";
import CartManager from "../../CartManager.js";

const cartsRouter = Router();
const cartManager = new CartManager();

cartsRouter.post("/", async (req, res) => {
  try {
    if (cartManager.newCart()) {
      res.send({ status: "OK", message: "El carrito se creó correctamente!" });
    } else {
      res
        .status(500)
        .send({ status: "error", message: "El carrito no se pudo crear!" });
    }
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    const cart = cartManager.getCart(cid);

    if (cart) {
      res.send({ products: cart.products });
    } else {
      res.status(500).send({
        status: "error",
        message: "Error! No se encuentra el ID del Carrito",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    const cart = cartManager.getCart(cid);

    if (cart) {
      if (cartManager.addProductToCart(cid, pid)) {
        res.send({
          status: "OK",
          message: "El producto se agregó al carrito correctamente!",
        });
      } else {
        res.status(400).send({
          status: "error",
          message: "Error! No se pudo agregar el producto al carrito!",
        });
      }
    } else {
      res.status(400).send({
        status: "error",
        message: "Error! No se encuentra el ID del carrito!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default cartsRouter;
