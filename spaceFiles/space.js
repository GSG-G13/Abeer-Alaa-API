const urlSpaceX = "https://api.spacexdata.com/v5/launches";
const wrapper = document.querySelector(".wrapper");
let dateBtn = document.querySelector("button");
const date = document.querySelector("input");
const apiKey = "CAUfhXpvrAO7B65ZdlhrhtM21bcb3oBuDFf4PEFv";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=`;
const travelsContainer = document.getElementById("travels");

const httpRequest = (url, callBack) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            if (callBack) {
                callBack(data);
            } else if (xhr.status == 400) {
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

    if (data.media_type === "video") {
        let iframe = document.createElement("iframe");
        iframe.setAttribute("frameborder", "0")
        iframe.src = data.url;
        wrapper.appendChild(iframe);

    } else {

        let img = document.createElement("img");
        img.src = data.url;
        wrapper.appendChild(img);
    }
}


// ===========================================================

const getDateEvents = (data) => {
    const year = document.getElementById("date").value.slice(0, 4);
    data.forEach(travel => {
        if (year && travel.date_utc.includes(year)) {
            createElement(travel);
        }
    });
};

const createElement = (travel) => {
    let divContent = document.createElement("div");
    divContent.className = "travel";
    let imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    let travelImg = document.createElement("img");
    if (travel.links.flickr.original.length > 0) {
        travelImg.src = travel.links.flickr.original[0];
    } else {
        travelImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSALyZZ_-LxKqSRbuunnBH1EukyciH8xvJ5QrircWFyCkrYzBkv0pISEekdFXJYniJVOv8&usqp=CAU';
    };
    let txtContainer = document.createElement("div");
    txtContainer.className = "txt-container";
    let name = document.createElement("h2");
    name.textContent = travel.name;
    let date = document.createElement("p")
    date.className = "date";
    date.textContent = travel.date_utc.slice(0, 10);
    let flightNumber = document.createElement("span");
    flightNumber.textContent = travel.flight_number;
    let videoLink = document.createElement("p");
    videoLink.className = "video-link";
    videoLink.textContent = 'To view the video of the trip, ';
    let link = document.createElement("a");
    link.href = travel.links.webcast;
    link.textContent = "click here";
    videoLink.appendChild(link);
    let description = document.createElement("p");
    description.className = "description";
    if (travel.details) {
        description.textContent = travel.details;
    } else {
        description.textContent = "default description";
    };
    let iconDiv = document.createElement("div");
    iconDiv.className = "icon";
    iconDiv.textContent = "Company";
    let icon = document.createElement("img");
    icon.src = travel.links.patch.small;
    let elementArray = [divContent, imgContainer, txtContainer, travelImg, name, date, flightNumber, videoLink, description, iconDiv];
    addElementToPage(elementArray);
};

const addElementToPage = (Array) => {
    Array[1].appendChild(Array[3]);
    Array[2].appendChild(Array[4]);
    Array[2].appendChild(Array[5]);
    Array[2].appendChild(Array[6]);
    Array[2].appendChild(Array[7]);
    Array[2].appendChild(Array[8]);
    Array[2].appendChild(Array[9]);
    Array[0].appendChild(Array[1]);
    Array[0].appendChild(Array[2]);
    travelsContainer.appendChild(Array[0]);
};



dateBtn.addEventListener("click", () => {
    httpRequest(`${url}${date.value}`, (data) => {
        wrapper.innerHTML = ""
        checkVideoOrImg(data);
        createDom(data);
    });
    travelsContainer.innerHTML = '';
    httpRequest(urlSpaceX, getDateEvents);
});

