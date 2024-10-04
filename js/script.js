//Convert seconds into hour,minute & seconds.
function getTime(time) {
  const hour = parseInt(time / 3600);
  const remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  const second = remainingSecond % 60;

  return `${hour} hour ${minute} minute ${second} seconds ago`;
}
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

//This API gets all the categories. data.categories has (Music, Comedy, Drawing).
//displayCategory() take category as parameter.
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
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      //Remove .active class from all the buttons. and only the clicked button
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideo(data.category);
    })
    .catch((error) => console.log(error));
};

const showDetails = async (videoId) => {
  console.log(video);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  console.log(video);
  const detailContainer = document.getElementById("modal-content");

  detailContainer.innerHTML = `
    <img src=${video.thumbnail} />
    <p class="text-center mt-6">${video.description}</p>
  
  `;
  //Way - 1
  // document.getElementById("showModalData").click();
  //Way - 2
  document.getElementById("customModal").showModal();
};

const displayCategory = (categories) => {
  //getting the element using id
  const buttonContainer = document.getElementById("button-container");

  categories.forEach((item) => {
    //Creating a button for each category
    console.log(item);
    const btnContainer = document.createElement("div");
    btnContainer.innerHTML = `
      <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
    `;
    //Adding button to button-container
    buttonContainer.appendChild(btnContainer);
  });
};

const displayVideo = (videos) => {
  //Getting video container using id
  const videoContainer = document.getElementById("video");
  videoContainer.innerHTML = " ";

  //if any array in videos has no video this means the length of that is 0,
  //So, basically we can take that point and show something specific to indicate
  //that the category is empty.
  if (videos.length === 0) {
    //for centering the icon and text.
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
        <div class="mt-14 max-h-[300px] w-full flex flex-col justify-center items-center gap-5">
          <img src="./design/icon.png" />
          <h1 class="font-bold text-4xl text-center"> Oops!! Sorry, There is no<br>content here</h1>
        </div>
        
    `;
    return;
  } else {
    //if videos array is not empty, then we will display the videos using grid.
    videoContainer.classList.add("grid");
  }

  //taking each video and showing it to HTML or user
  videos.forEach((video) => {
    const div = document.createElement("div");
    div.classList = "card card-compact";
    //Making a child element (card) for each child in div.
    div.innerHTML = `
        <figure class="h-[200px]">
            <img class="h-full w-full object-cover" src=${video.thumbnail}/>
            ${
              //getTime function will convert seconds to hours, minutes and seconds

              video.others.posted_date.length == 0
                ? " "
                : `<span class="absolute bottom-16 bg-black text-white rounded-xl p-1 right-3">
                  ${getTime(video.others.posted_date)}
                </span>`
            }
        </figure>
        <div class="px-0 py-2 flex gap-3">
          <div>
            <img class="w-10 h-10 rounded-full object-cover" src="${
              video.authors[0].profile_picture
            }"/>
          </div>
          <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex items-center gap-2">
              <p>${video.authors[0].profile_name}</p>
              ${
                //varifying if the user has varified badge using API data.
                video.authors[0].verified === true
                  ? `<img class="h-4 w-4 src="./design/tickk.png"/>`
                  : " "
              }
            </div>
            <p><button onclick="showDetails('${
              video.video_id
            }')" class="btn btn-sm btn-error">Details</button> </p>
          </div>
        </div>
        `;
    //Adding the child element using appendChild();
    videoContainer.appendChild(div);
  });
};

loadData();
loadVideo();
