const complimentBtn = document.getElementById('complimentButton');
const fortuneBtn = document.getElementById('fortuneButton');
const fortuneCard = document.getElementById('fortuneCard');
const gifContainer = document.getElementById('gifContainer');
const form = document.querySelector('form');

const baseURL = 'http://localhost:4000/api';

const getCompliment = () => {
  axios.get(`${baseURL}/compliment`).then((res) => {
    const data = res.data;
    alert(data);
  });
};

const displayFortune = () => {
  axios
    .get(`${baseURL}/fortune`)
    .then((res) => {
      const data = res.data;
      fortuneCard.textContent = data;

      // alert(data);
    })
    .catch((err) => console.log(err));
};

const createGif = (body) => {
  axios
    .post(`${baseURL}/gifs`, body)
    .then(getAllGifs)
    .catch((err) => console.log(err));
};

const deleteGif = (id) =>
  axios
    .delete(`${baseURL}/gifs/${id}`)
    .then(location.reload())
    .catch((err) => console.log(err));

const editGif = (id) => {
  axios
    .put(`${baseURL}/gifs/${id}`)
    .then(location.reload())
    .catch((err) => console.log(err));
};

const submitGif = () => {
  let link = document.getElementById('link');
  let origin = document.getElementById('origin');
  let description = document.getElementById('description');
  let joyValue = document.getElementById('joyValue');

  let gifInfo = {
    link: link.value,
    origin: origin.value,
    description: description.value,
    joyValue: joyValue.value,
  };

  createGif(gifInfo);

  link.value = '';
  origin.value = '';
  description.value = '';
};

const getAllGifs = () => {
  axios.get(`${baseURL}/gifs`).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      const { id, link, origin, description, joyValue } = res.data[i];
      let gifCard = document.createElement('div');
      gifCard.classList.add('flex-column-container', 'classic-border');
      gifCard.innerHTML = `<img src=${link} /><p><strong>Source:<em>${origin}</em></strong></p><p>Description: ${description}</p>
			<div>Smile Rating: ${joyValue}</div><div><button onclick="editGif(${id})">Encode Description</button><button onclick="deleteGif(${id})">Delete</button></div>`;
      gifContainer.appendChild(gifCard);
    }
  });
};

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', displayFortune);
form.addEventListener('submit', submitGif);
// editForm.addEventListener('submit', editGif);

getAllGifs();
