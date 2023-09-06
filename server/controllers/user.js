const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sakdfnsadklfnasdgsdfgsdgfg';
const Image=require('../models/image')
const Users=require('../models/user')

exports.userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("registerrrrvhjvjhvj...."+req.body.email)
    try { 
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const UserDoc = await Users.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        
        const token = jwt.sign({ email: UserDoc.email, id: UserDoc._id }, jwtSecret, {
            expiresIn: '1h',
        });
        console.log("completed registeration..........")
        res.status(201).json({ UserDoc, token });
        
    } catch (e) {
        res.status(422).json({  message: e.message });
        console.log(error)
    }
};

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const UserDoc = await Users.findOne({ email });
        if (UserDoc) {
            const passok = bcrypt.compareSync(password, UserDoc.password);
            if (passok) {
                const token = jwt.sign({ email: UserDoc.email, id: UserDoc._id }, jwtSecret, {
                    expiresIn: '1h',
                });
                res.status(201).json({ UserDoc, token });

            } else {
                res.status(401).json({ error: 'Authentication failed', message: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ error: 'User not found', message: 'No user with this email' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Server error', message: e.message });
    }
};

exports.createImage = async (req, res) => {
    const image = req.body;
   
    const newImage = new Image({
        ...image,
        Creator: req.userId,
        createdAt: new Date().toISOString(),
    });

    try {
       
        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        console.error("Error creating image:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getImages=async (req,res)=>{
    try{
        
        const images=await Image.find()
        res.status(200).json(images)
       
    }catch(error){
        res.status(404).json({message:"something went wrong" })
    }
};

exports.getImage=async (req,res)=>{
    const {id}=req.params;
    try{
        const image=await Image.findById(id)
        console.log("Single View"+image)
        res.status(200).json(image)
       
    }catch(error){
        res.status(404).json({message:"something went wrong" })
    }
};

exports.getImageBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
      const title = new RegExp(searchQuery, "i");
      // Replace 'TourModal' with the actual model you're using for tours
      const images = await Image.find({ title });
      res.json(images);
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
};





