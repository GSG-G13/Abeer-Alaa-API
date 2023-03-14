const urlSpaceX = "https://api.spacexdata.com/v5/launches";
const wrapper = document.querySelector(".wrapper");
let getMedia = document.querySelector("button");
const date = document.querySelector("input");
const apiKey = "CAUfhXpvrAO7B65ZdlhrhtM21bcb3oBuDFf4PEFv";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=`;

const httpRequest = (url, callBack) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            if (callBack) {
                callBack(data);
            } else if(xhr.status == 400) {
            wrapper.innerHTML = ""
            errorStatus()
        }

        }

    }

}

const errorStatus = () => {
    let msgError = document.createElement("h3");
    msgError.className = "msg";
    msgError.textContent = "Not Found!!!";
    wrapper.appendChild(msgError);
    let imgError = document.createElement("img");
    imgError.src = "../img/error.png";
    wrapper.appendChild(imgError)

}


const createDom = (data) => {
   let details = document.createElement("div");
    details.className = "details";
    let date = document.createElement("p");
    date.textContent = data.date;
    details.appendChild(date);

    let title = document.createElement("h2");
    title.textContent = data.title;
    details.appendChild(title);

    let explain = document.createElement("div");
    explain.textContent = data.explanation;
    details.appendChild(explain);
    wrapper.appendChild(details);
}

const checkVideoOrImg = (data) => {

  if(data.media_type === "video"){
    let iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder","0")
    iframe.src = data.url;
    wrapper.appendChild(iframe);

} else {

    let img = document.createElement("img");
    img.src = data.url;
    wrapper.appendChild(img);
}
}



getMedia.addEventListener("click",() => {
    httpRequest(`${url}${date.value}`,(data)=> {
    console.log(data)
    wrapper.innerHTML = ""
    checkVideoOrImg(data) ;
    createDom(data);
});
});
