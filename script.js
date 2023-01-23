const container = document.getElementById("container");
container.innerHTML = "";

function getQ() {
    const search = /q=([a-zA-Zа-яА-Я ,"'_\-0-9]+)&?/
    const q = search.exec(decodeURI(document.location.search));

    if (q === null) return false;
    const q1 = q[1];

    if (q1 === undefined || q1 === '') return false;
    return q1;
}

async function loadProducts() {
    const result = await fetch('./products.json');
    const data = await result.json();
    console.log(data)
    const q = getQ();

    for (let i of data) {
        if (!q) {
            let element = document.createElement('div');
            element.innerHTML = '<div class="col py-2">' +
                '<div class="card" style="width: 18rem;">' +
                '<img src="' + i.img + '" class="card-img-top p-2" alt="...">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + i.name + '</h5>' +
                '<p class="card-text">' + i.description + '</p>' +
                '<a href="#" class="btn btn-primary">Купить ' + i.price + '₽</a>' +
                '</div></div></div>';

            container.append(element);
        } else if (i.name.includes(q) || i.description.includes(q)) {
            let element = document.createElement('div');
            element.innerHTML = '<div class="col py-2">' +
                '<div class="card" style="width: 18rem;">' +
                '<img src="' + i.img + '" class="card-img-top p-2" alt="...">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + i.name + '</h5>' +
                '<p class="card-text">' + i.description + '</p>' +
                '<a href="#" class="btn btn-primary">Купить ' + i.price + '₽</a>' +
                '</div></div></div>';

            container.append(element);
        }
    }
}

loadProducts().then();


