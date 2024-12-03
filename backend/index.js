const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log, error } = require("console");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
//mongoose.connect("mongodb+srv://hectormarey145:hemare145admin@cluster0.pwboi.mongodb.net/");
mongoose.connect("mongodb+srv://stroke241316:EEUn7SZCTaj0troc@cluster0.dnbgy.mongodb.net/");


//API Creation

app.get("/",(req,res)=>{

    res.send("Express App is Running");

})

// Iamge Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products

const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
    popular: { type: Boolean, default: false } // Agregar el campo popular al esquema
});

const fetchAdmin = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Por favor, autentifíquese con un usuario válido" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        if (!data.user.isAdmin) {
            return res.status(403).send({ errors: "Acceso denegado. No es un administrador." });
        }
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ errors: "Por favor autentifíquese con un valor válido" });
    }
};

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        popular: req.body.popular || false, // Acepta el campo popular
    });

    console.log(product);
    await product.save();
    console.log("Guardado");
    res.json({
        success: true,
        name: req.body.name,
    });
});

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Eliminado");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("Todos los productos existentes")
    res.send(products);
})

// Schema creating for User

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isAdmin: { // Campo nuevo
        type: Boolean,
        default: false, // Por defecto, no es administrador
    }
});

// Creating Endpoitn for registering the user
// En tu backend
app.post('/signup', fetchAdmin, async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "Usuario existente con el mismo correo electrónico" });
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin || false, // El valor de isAdmin proviene del frontend
    });

    try {
        await user.save();
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'secret_ecom');
        return res.json({ success: true, token, user: { id: user._id, isAdmin: user.isAdmin } });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).json({ success: false, error: "Error al crear el usuario" });
    }
});

// Creating Endpoint for login the user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, error: "Usuario no encontrado" });
    }

    if (user.password !== password) {
        return res.status(400).json({ success: false, error: "Contraseña incorrecta" });
    }

    const data = {
        user: {
            id: user.id,
            name: user.name,
            isAdmin: user.isAdmin // Asegúrate de incluir isAdmin aquí
        }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token, user: data.user }); // Incluye el usuario en la respuesta
});



// Endpoint para archivos de lo mas vendido
app.get('/popularproducts', async (req, res) => {
    try {
        const popularProducts = await Product.find({ popular: true });
        console.log("Productos populares encontrados:", popularProducts); // Log para verificar
        res.send(popularProducts);
    } catch (error) {
        console.error("Error al obtener productos populares:", error);
        res.status(500).json({ success: false, message: "Error al obtener productos populares" });
    }
});

// Creating middleware to fetch user



// Endpoint para añadir productos en cartdata
app.post('/addtocart' , async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        // Asegúrate de que cartData exista y tenga la propiedad para itemId
        if (!userData.cartData[req.body.itemId]) {
            userData.cartData[req.body.itemId] = 0;  // Inicializa en 0 si no existe
        }
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Añadido");
    } catch (error) {
        res.status(500).send({ errors: "Hubo un error al agregar el producto al carrito" });
    }
});

// Endpoint para obtener todos los usuarios
app.get('/allusers', async (req, res) => {
    try {
        const users = await Users.find({}); // Obtiene todos los usuarios
        res.json(users); // Devuelve los usuarios en formato JSON
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ success: false, message: "Error al obtener usuarios" });
    }
});

app.post('/removeuser', async (req, res) => {
    await Users.findOneAndDelete({ _id: req.body.id }); // Cambia id por _id
    console.log("Eliminado");
    res.json({
        success: true,
        name: req.body.name
    });
});



app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port);
    }
    else
    {
        console.log("Error : "+error);
    }
});

