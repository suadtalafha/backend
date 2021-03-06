'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const axios = require('axios');

const server = express();
server.use(cors());


const PORT = process.env.PORT;
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/book-app', { useNewUrlParser: true, useUnifiedTopology: true });
const Bookschema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    img: String
});


const ownerSchema = new mongoose.Schema({
    email: String,
    books: [Bookschema]


});
const userBooks = mongoose.model('Book', ownerSchema);


function seedUserCollection(){

    const Suad = new userBooks(
        {
            email: 'suadhusam0@gmail.com',
            books: [
                {
                    name: 'The Growth Mindset',
                    description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.',
                    status: 'FAVORITE FIVE',
                    img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg'
                },
    
                {
                    name: 'The Momnt of Lift',
                    description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.',
                    status: 'RECOMMENDED TO ME',
                    img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'
                }
            ]
        })
        // Suad.save();

}
// seedUserCollection();
// http://localhost:3001/books?userEmail=suadhusam@yahoo.com

server.get('/books',handelUser);
function handelUser(req,res){
let userEmail=req.query.userEmail;
userBooks.find({email:userEmail},function(error,data){
    if(error){
        res.send(error)
    }else{
        res.send(data[0].books)
    }
})
}
server.post('/addbook',addingBook);
server.delete('/deletebook/:bookIndex',deletingBook);

function addingBook(req,res){
    let {email,name,description,status,img}=req.body
    myModal.find({email:email},function(error,bookData){
         if(error){
             res.send('did not work')
         }else{
             bookData[0].books.push({
                name: name,
                description: description,
                status: status,
                img: img,
             })
             bookData[0].save();
             res.send( bookData[0].books)
         }
    })
}

function deletingBook(req,res){
    let emailReq=req.query.email;
    let index=Number(req.params.bookIndex);

    bookModle.find({email:emailReq},function(error,bookData){
        if(error){
            res.send('did not work')
        }else{
            let newBooksArr = bookData[0].books.filter((book,idx)=>{
                if(idx !== index) {return book}
             
            })
            bookData[0].books=newBooksArr
            
            bookData[0].save();
            res.send(bookData[0].books)
         }
        
    })
}



server.listen(PORT, () => {
    console.log(`Listenng on Port : ${PORT}`);
})




