const urlSpaceX = "https://api.spacexdata.com/v5/launches";

const httpRequest = (url, callBack) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            if (callBack) {
                callBack(data);
            }
        }

    }

}

httpRequest(urlSpaceX);