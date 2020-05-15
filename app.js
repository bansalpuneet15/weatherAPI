const express=require("express");
const https=require("https");

const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query=req.body.cityName;
  const apikey="6776e88ab9b8f1c2fe4d2f35487e93d2";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const describe=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL= "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + describe + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + "degrees celcius</h1>");
      res.write("<img src=" + imageURL +">");
      res.send();
    })
  });
});



app.listen(3000, function(){
  console.log("The server is running on port 3000");
});
