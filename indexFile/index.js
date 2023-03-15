const urlSpaceX = "https://api.spacexdata.com/v5/launches";
const wrapper = document.querySelector(".wrapper");
const date = document.querySelector("input");
const apiKey = "CAUfhXpvrAO7B65ZdlhrhtM21bcb3oBuDFf4PEFv";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=`;
const travelsContainer = document.getElementById("travels");
const searchBtn = document.getElementById("search-btn");
let dateBtn = document.querySelector("button");




const httpRequest = (url, callBack, search) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            if (callBack) {
                if (search) {
                    callBack(data, search);
                } else {
                    callBack(data);
                }
            }

        } else if (xhr.status == 400) {
            wrapper.innerHTML = "";
            errorStatus();
        }
    }
}

const errorStatus = () => {
    let errDiv = document.createElement("div");
    errDiv.className = "edd-div";
    let imgError = document.createElement("img");
    imgError.src = "../img/400 Error Bad Request.png";
    errDiv.appendChild(imgError);
    wrapper.appendChild(errDiv);

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
        iframe.setAttribute("frameborder", "0");
        iframe.src = data.url;
        wrapper.appendChild(iframe);
    } else {
        let img = document.createElement("img");
        img.src = data.url;
        wrapper.appendChild(img);
    }
}


// ===========================================================

const getDateEvents = (data, search) => {
    const year = document.getElementById("date").value.slice(0, 4);
    let nameInput = document.getElementById("name-input").value;

    if (search) {
        data.forEach((travel) => {
            if (travel.name.includes(nameInput)) {
                createElement(travel);
            }
        });

    } else {
        data.forEach(travel => {
            if (year && travel.date_utc.includes(year)) {
                createElement(travel);
            }
        });
    }
};

const createElement = (travel) => {
    let divContent = document.createElement("div");
    divContent.className = "travel";
    let imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    let travelImg = document.createElement("img");
    travelImg.className = "travel-img";
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
    flightNumber.textContent = `flight Number: ${travel.flight_number}`;
    let videoLink = document.createElement("a");
    videoLink.href = travel.links.webcast;
    videoLink.title = "Watch Video";
    videoLink.id = "watch-video";
    let vidIco = document.createElement('img');
    vidIco.src = "../img/ve.png";
    let videoDiv = document.createElement("div");
    videoDiv.className = "video-div";
    videoLink.appendChild(vidIco);
    videoDiv.append(videoLink);
    let description = document.createElement("p");
    description.className = "description";

    if (travel.details) {
        description.textContent = travel.details;
    } else {
        description.textContent = "A journey to the Moon is a once-in-a-lifetime experience. From blasting off into space, to witnessing the Earth from a unique perspective, to experiencing the Moon's low gravity and barren landscape, it's a trip that few humans have ever had the opportunity to take. As space technology continues to evolve, it's a destination that could become increasingly accessible in the future.";
    };

    let icons = document.createElement("div")
    icons.className = "icons";
    let iconDiv = document.createElement("div");
    iconDiv.className = "icon-div";
    iconDiv.textContent = "Company";
    let icoUrl = document.createElement("a");
    icoUrl.setAttribute("target", "_blank");
    icoUrl.className = "ico-url";
    icoUrl.href = "https://www.space.com/";
    let icon = document.createElement("img");
    icon.className = "ico";

    if (travel.links.patch.small) {
        icon.src = travel.links.patch.small;
    } else {
        icon.src = '../img/dlogo.jpg'
    }

    icoUrl.appendChild(icon)
    iconDiv.appendChild(icoUrl)
    icons.appendChild(iconDiv)
    icons.appendChild(videoDiv)
    let elementArray = [divContent, imgContainer, txtContainer, travelImg, name, date, flightNumber, description, icons];
    addElementToPage(elementArray);
};

const addElementToPage = (Array) => {
    Array[1].appendChild(Array[3]);
    Array[2].appendChild(Array[4]);
    Array[2].appendChild(Array[5]);
    Array[2].appendChild(Array[6]);
    Array[2].appendChild(Array[7]);
    Array[2].appendChild(Array[8]);
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


searchBtn.addEventListener("click", () => {
    travelsContainer.innerHTML = '';
    httpRequest(urlSpaceX, getDateEvents, true);
})
