const productsData = [
    {
        id: 1,
        name: "Golden",
        ibu: 18,
        category: "golden",
        userImg: "./assets/img/lata-golden.png",
        price: "$300",
    },
    {
        id: 2,
        name: "Apa",
        ibu: 30,
        category: "apa",
        userImg: "./assets/img/lata-apa.png",
        price: "$300",
    },
    {
        id: 3,
        name: "Ipa",
        ibu: 50,
        category: "Ipa",
        userImg: "./assets/img/lata-ipa.png",
        price: "$300",
    },
    {
        id: 4,
        name: "Amber",
        ibu: 30,
        category: "amber",
        userImg: "./assets/img/lata-amber.png",
        price: "$300",
    },
    {
        id: 5,
        name: "Porter",
        ibu: 30,
        category: "porter",
        userImg: "./assets/img/lata-porter.png",
        price: "$300",
    },
    {
        id: 6,
        name: "LÄB",
        ibu:30,
        category: "apa",
        userImg: "./assets/img/lata-lab.png",
        price: "$300",
    },
]

const divideProductsInParts = (size) => {
    let productsList = [];
    for (let i = 0; i < productsData.length; i += size) {
        productsList.push(productsData.slice(i, i + size));
    }
    return productsList;
};

const appState = {
    products: divideProductsInParts(6),
    currentProductsIndex: 0,
    productsLimit: divideProductsInParts(6).length,
    activeFilter: null,

};