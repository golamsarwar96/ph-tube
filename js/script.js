const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error));
};
const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((error) => console.log(error));
};

const displayCategory = (categories) => {
  //getting the element using id
  const buttonContainer = document.getElementById("button-container");

  categories.forEach((item) => {
    //Creating a button for each category
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    //Adding button to button-container
    buttonContainer.appendChild(button);
  });
};

const displayVideo = (videos) => {
  const videoContainer = document.getElementById("video");

  videos.forEach((video) => {
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
        <figure>
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            
            <p>If a dog chews shoes whose shoes does he choose?</p>
            
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
         </div>
    `;

    videoContainer.appendChild(div);
  });
};

loadData();
loadVideo();
