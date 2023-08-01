import { Router } from "express";
import ProductManager from "../../ProductManager.js";

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get("/", async (req, res) => {
  try {
    const products = productManager.getProducts();
    let limit = Number(req.query.limit);
    if (limit) {
      let arrayProds = [...products];
      const productsLimit = arrayProds.slice(0, limit);
      return res.send(productsLimit);
    } else {
      res.send(products);
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const products = productManager.getProducts();
    let pid = Number(req.params.pid);
    const product = products.find((prod) => prod.id === pid);
    if (product) {
      res.status(200).send({
        product,
      });
    } else {
      res.send({
        status: "error",
        message: "No se encontro ningún producto con el id #" + pid,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    let {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    if (!title) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Title!",
      });
      return false;
    }

    if (!description) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Description!",
      });
      return false;
    }

    if (!code) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Code!",
      });
      return false;
    }

    if (!price) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Price!",
      });
      return false;
    }

    status = !status && true;

    if (!stock) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Stock!",
      });
      return false;
    }

    if (!category) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Category!",
      });
      return false;
    }

    if (!thumbnails) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Thumbnails!",
      });
      return false;
    } else if (!Array.isArray(thumbnails) || thumbnails.length == 0) {
      res.status(400).send({
        status: "error",
        message:
          "Error! Debe ingresar al menos una imagen en el Array Thumbnails!",
      });
      return false;
    }

    if (
      productManager.addProduct({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      })
    ) {
      res.send({
        status: "ok",
        message: "El Producto se agregó correctamente!",
      });
    } else {
      res.status(500).send({
        status: "error",
        message: "Error! No se pudo agregar el Producto!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    let pid = Number(req.params.pid);
    let {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    let obj = req.body;

    if (!title) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Title!",
      });
      return false;
    }

    if (!description) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Description!",
      });
      return false;
    }

    if (!code) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Code!",
      });
      return false;
    }

    if (!price) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Price!",
      });
      return false;
    }

    status = !status && true;

    if (!stock) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Stock!",
      });
      return false;
    }

    if (!category) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Category!",
      });
      return false;
    }

    if (!thumbnails) {
      res.status(400).send({
        status: "error",
        message: "Error! No se cargó el campo Thumbnails!",
      });
      return false;
    } else if (!Array.isArray(thumbnails) || thumbnails.length == 0) {
      res.status(400).send({
        status: "error",
        message:
          "Error! Debe ingresar al menos una imagen en el Array Thumbnails!",
      });
      return false;
    }

    if (
      productManager.updateProduct(pid, {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      })
    ) {
      res.send({
        status: "ok",
        message: "El Producto se actualizó correctamente!",
      });
    } else {
      res.status(500).send({
        status: "error",
        message: "Error! No se pudo actualizar el Producto!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    let pid = Number(req.params.pid);

    if (productManager.deleteProduct(pid)) {
      res.send({
        status: "ok",
        message: "El Producto se eliminó correctamente!",
      });
    } else {
      res.status(500).send({
        status: "error",
        message: "Error! No se pudo eliminar el Producto!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default productsRouter;
