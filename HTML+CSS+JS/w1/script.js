const products = [
    {
      name: "Wireless Headphones",
      image: "https://media.wired.com/photos/66abec9ccb172c2e5de763bf/master/w_960,c_limit/Edifier-Stax-Spirit-S5-Headphones-Offwhite-Background-SOURCE-Amazon.jpg",
      price: 7999,
      description: "Noise-cancelling over-ear headphones."
    },
    {
      name: "Smartwatch",
      image: "https://www.gonoise.com/cdn/shop/files/1_c95e5561-4f66-413d-b143-42d31821e554.webp?v=1721392308",
      price: 12999,
      description: "Fitness tracking smartwatch."
    },
    {
      name: "Gaming Mouse",
      image: "https://www.portronics.com/cdn/shop/files/Artboard1_2b95dd60-aa4a-45ee-8ed0-4b7e8603321e.jpg?v=1702375127",
      price: 2499,
      description: "Ergonomic gaming mouse."
    },
    {
      name: "Laptop Stand",
      image: "https://m.media-amazon.com/images/I/71xlXzGX9aL.jpg",
      price: 1999,
      description: "Adjustable aluminium stand."
    },
    {
      name: "Wireless Charger",
      image: "https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dwf8c64cda/images/hi-res/3/3cdab412a0984f09_WIZ022qcBK_BoostCharger_3in1Pad_Hero_withPSU_WEB.jpg?sw=700&sh=700&sm=fit&sfrm=png",
      price: 1499,
      description: "Fast wireless charging pad."
    },
    {
      name: "4K Monitor",
      image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08894694.png",
      price: 25999,
      description: "27-inch 4K UHD monitor."
    },
    {
      name: "Webcam",
      image: "https://dlcdnwebimgs.asus.com/gain/818d26a5-2d8b-49e3-8381-86fb5945d8cd/w800",
      price: 2999,
      description: "HD webcam with microphone."
    }
  ];

  const rowsPerpage = 4;
  let currentPage = 1;

  const tableBody = document.getElementById("tableBody");
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevBtn");
  const nextbtn = document.getElementById("nextBtn");

  function displayTable(page){
    tableBody.innerHTML = "";
    const start = (page - 1)*rowsPerpage;
    const end = start + rowsPerpage;

    const paginatedItems = products.slice(start, end);

    paginatedItems.forEach(product => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        const imageCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = product.image;
        imageCell.appendChild(img);

        const priceCell = document.createElement("td");
        priceCell.textContent = `Rs.${product.price}`

        const descCell = document.createElement("td");
        descCell.textContent = product.description;

        row.appendChild(nameCell);
        row.appendChild(imageCell);
        row.appendChild(priceCell);
        row.appendChild(descCell);

        tableBody.appendChild(row);

    });

  const totalPages = Math.ceil(products.length/rowsPerpage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextbtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click",() => {
    if(currentPage > 1){
        currentPage--;
        displayTable(currentPage);
    }
});

nextbtn.addEventListener("click", () => {
    const totalPages = Math.ceil(products.length / rowsPerpage);
    if(currentPage < totalPages){
        currentPage++;
        displayTable(currentPage);
    }
});

// Initial display
displayTable(currentPage);