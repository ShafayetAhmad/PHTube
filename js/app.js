const categoriesURL =
  "https://openapi.programming-hero.com/api/videos/categories";
const categoriesListField = document.getElementById("categoriesList");
const cardsSection = document.getElementById("cardsSection");
const timestampSection = document.getElementById("timestamp");
let verified_logo = ``;

categoriesListField.innerHTML = `<span class="loading loading-spinner loading-lg"></span>`;

const categoriesListHandler = async () => {
  const res = await fetch(categoriesURL);
  const data = await res.json();
  const list = data.data;
  showCategoriesListHandler(list);
};

const showCategoriesListHandler = (list) => {
  categoriesListField.innerHTML = ``;
  list.forEach((category) => {
    const categoryBtnMaker = document.createElement("div");
    categoryBtnMaker.innerHTML = `
      <button class="mx-5 my-2 btn-info btn-active px-5 py-2 rounded-lg font-bold" onclick="showCards(${category.category_id})">${category.category}</button>
    `;
    categoriesListField.appendChild(categoryBtnMaker);
  });
};

function showCards(category_id) {
  cardsSection.innerHTML = `<span class="loading loading-spinner loading-lg"></span>`;
  const categoryURL = `https://openapi.programming-hero.com/api/videos/category/${category_id}`;
  const displayCardsHandler = async () => {
    const res = await fetch(categoryURL);
    const data = await res.json();
    const contents = data.data;

    cardsSection.innerHTML = ``;
    if (contents.length > 0) {
      cardsSection.classList =
        "grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 justify-center my-10";
      contents.forEach((content) => {
        console.log(content);
        if (content.authors[0].verified) {
          verified_logo = `<svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 512 512"
                class="inline"
              >
                <style>
                  svg {
                    fill: #005eff;
                  }
                </style>
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                />
              </svg>`;
        }
        const singleCard = document.createElement("div");
        singleCard.innerHTML = `
        <div class="card h-96 bg-base-100 shadow-xl">
      <figure><img src="${content.thumbnail}" alt="" /></figure>
      <div class="card-body flex flex-row">
        <div class="pro-pic">
          <img
            class="w-14 rounded-full mt-2"
            src="${content.authors[0].profile_picture}"
            alt=""
          />
        </div>
        <div class="details">
        <div class="timestamp px-2 rounded-lg top-2 right-1 absolute bg-black text-white">${timestampHandler(
          content.others.posted_date
        )}</div>
          <h2 class="card-title">${content.title}</h2>
          <div class="blue-btn flex flex-row">
            <p class="inline">
              ${content.authors[0].profile_name}&nbsp;&nbsp;
              ${verified_logo}
            </p>
          </div>

          <p>${content.others.views} views</p>
        </div>
      </div>
    </div>
    `;
        cardsSection.appendChild(singleCard);
        console.log(content.authors[0].profile_name);
      });
    } else {
      cardsSection.classList = "justify-center my-10";
      cardsSection.innerHTML = `
        <div class="flex items-center justify-center h-full">
          <div class="m-auto flex items-center justify-center flex-col">
            <img class="w-40 my-14" src="../img/Icon.png" alt="" />
            <h2 class="text-5xl font-bold">
              Oops!! Sorry, There is no content here
            </h2>
          </div>
        </div>
      `;
    }
  };
  displayCardsHandler();
}

categoriesListHandler();
showCards(1000);

function timestampHandler(givenSeconds) {
  if (!givenSeconds) {
    return "";
  }
  const hrs = parseInt(givenSeconds / 3600);
  const mnts = parseInt((givenSeconds % 3600) / 60);
  const secs = parseInt(givenSeconds % 60);
  const str = `${hrs}hrs ${mnts}min ${secs}sec ago`;
  return str;
}
