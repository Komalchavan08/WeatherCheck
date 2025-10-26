const apiKey="aaf90a0716c7a2d90b223f8b1fb41fac";

async function getWeather() {
    const location= document.getElementById("locationInput").value.trim();

    if(!location)
    {
        alert("please enter a location!");
        return;
    }

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try{
        const response=await fetch(url);
        if(!response.ok)
        {
            throw new Error("Location not found. Try another one.");
        }

        const data=await response.json();
        updateWeatherUI(data);
    }
    catch(error)
    {
      alert(error.message);
    }
}

function updateWeatherUI(data)
{
    const city=data.name;
    const country=data.sys.country;
    const temp=data.main.temp;
    const feelsLike=data.main.feels_like;
    const wind=data.wind.speed;
    const icon=data.weather[0].icon;
    const description=data.weather[0].main;
    const time=new Date(data.dt*1000);
    const sunrise=new Date(data.sys.sunrise*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    document.getElementById("location").textContent=`${city},${country}`;
    document.getElementById("time").textContent=time.toLocaleString();
    document.getElementById("temperature").textContent=`${temp}°C`;
    document.getElementById("real-temp").textContent=`${feelsLike}°`;
    document.getElementById("sunrise").textContent=sunrise;
    document.getElementById("wind").textContent=`${wind}m/s`;
 

    document.getElementById("weather-icon").innerHTML=
    `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">`;

    const hour=time.getHours();
    const greeting= hour<12
    ?"Good Morning 🌞"
    :hour<18
    ?"Good Afternoon ☀️"
    :"Good Evening 🌙";
    document.getElementById("greeting").textContent=greeting;


    const card=document.querySelector(".weather-card");
    if(hour>=18 || hour <6)
    {
        card.classList.add("dark");
    }else{
        card.classList.remove("dark");
    }

    card.classList.add("fade-in");
    setTimeout(()=>{
        card.classList.remove("fade-in");
    },1000);
}