let Data = [];

let Users_Container = document.querySelector("#Users_Container");
let Next_BTN = document.querySelector("#next-button");
let Current_User_Index = 0;

async function getUserData() {
  try {
    let Promise_Fetch = await fetch("src/data/api.json");

    if (!Promise_Fetch.ok) {
      throw new Error(`Error: ${Promise_Fetch.status}`);
    }

    let Parsed_Data = await Promise_Fetch.json();
    Data = Parsed_Data.results;
    updateUserCard();
  } catch (error) {
    console.log(error.message);
  }
}

async function getRandomPicture() {
    try {
    let Promise_Fetch = await fetch("https://picsum.photos/200");

    if (!Promise_Fetch.ok) {
      throw new Error(`Error: ${Promise_Fetch.status}`);
    }

    let Image = await Promise_Fetch.url;
    console.log(Image);
    return Image;

  } catch (error) {
    console.log(error.message);
  }
}

async function updateUserCard() {
  if (Data == []) {
    return;
  }
  let User = Data[Current_User_Index];
  let Image = await getRandomPicture();
  Users_Container.innerHTML = "";
  let HTML = `<div class="card">
                <img src="${Image}" id="student-image" class="card-img-top" alt="Student Image">
                <div class="card-body">
                    <h5 id="student-name" class="card-title">${User.firstName} ${User.lastName}</h5>
                    <p id="student-email" class="card-text">${User.email}</p>
                </div>
            </div>`;

  Users_Container.insertAdjacentHTML("beforeend", HTML);
}

// Load the first user when the page loads
window.onload = getUserData;
Next_BTN.addEventListener("click", () => {
    console.log("CLick");
    if (Current_User_Index === (Data.length - 1) ){
        Current_User_Index = 0;
    } else {
        Current_User_Index += 1;
    }
    updateUserCard();
})