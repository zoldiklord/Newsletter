const express = require("express")
const request = require("request")
const https = require('https');
const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{

  res.sendFile(__dirname +"/signup.html")


})

app.post("/",(req,res)=>{
    const firstName = req.body.fName;
    const lastName = req.body.LName;
    const  email = req.body.email;


    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME: firstName,
                    LNAME: lastName

                


            }
        }



        ]



    }
    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/d57295feef"

    const options = {
          method : "POST",
          auth : "hamza:6fab41f5c44e896998700176f7d68786-us20"




    }
    const request = https.request(url,options,(response)=>{

        response.on("data",(data)=>{

            console.log(JSON.parse(data))
        })
        if(response.statusCode == 200)
            res.sendFile(__dirname +"/success.html")
        else res.sendFile(__dirname +"/failure.html")
           


    })

    request.write(jsonData)
    request.end()
    



    

})

app.post("/failure",(req,res)=>{


   res.redirect("/")

})









app.listen(process.env.PORT || 3000,()=>{


    console.log("listening on port 3000")    
})


// api key
// 6fab41f5c44e896998700176f7d68786


//list id
// d57295feef