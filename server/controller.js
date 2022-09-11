let gifs = require('./db.json');
let globalId = 2;

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      'Cool shirt!',
      'Your Javascript skills are stellar.',
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const fortunes = [
      'A person of words and not deeds is like a garden full of weeds.',
      'All the effort you are making will ultimately pay off.',
      'Any decision you have to make tomorrow is a good decision.',
      'Chance favors those in motion.',
      'Curiosity kills boredom. Nothing can kill curiosity.',
      'Follow the middle path. Neither extreme will make you happy.',
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
  },

  getGifs: (req, res) => {
    console.log(gifs[0].description);
    res.status(200).send(gifs);
  },

  deleteGif: (req, res) => {
    let index = gifs.findIndex((elem) => elem.id === +req.params.id);
    gifs.splice(index, 1);
    res.status(200).send(gifs);
  },

  editGif: (req, res) => {
    let index = gifs.findIndex((elem) => elem.id === +req.params.id);
    let alpha = 'abcdefghijklmnopqrstuvwxyz';
    let description = gifs[index].description.toLowerCase();
    console.log(alpha.indexOf(description[1]));
    let crypticStr = '';
    for (let i = 0; i < description.length; i++) {
      let alphaPlace = alpha.indexOf(description[i]);
      if (alphaPlace === -1) {
        crypticStr += ' ';
      } else if (alphaPlace <= 13) {
        crypticStr += alpha[alphaPlace + 12];
      } else if (alphaPlace > 13) {
        crypticStr += alpha[alphaPlace - 14];
      }
    }
    gifs[index].description = crypticStr;
    res.status(200).send(gifs);
  },

  createGif: (req, res) => {
    const { link, origin, description, joyValue } = req.body;
    let newGif = {
      id: globalId,
      link,
      origin,
      description,
      joyValue: +joyValue,
    };
    gifs.push(newGif);
    globalId++;
    res.status(200).send(gifs);
  },
};
