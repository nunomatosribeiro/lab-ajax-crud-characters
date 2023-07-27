const charactersAPI = new APIHandler("http://localhost:8000");
const characterContainer = document.getElementsByClassName(
  "characters-container"
);
const characterInfo = document.getElementsByClassName("characters-info");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      const fullListRaw = await charactersAPI.getFullList();
      const fullList = fullListRaw.data;
      console.log("fullList", fullList);
      fullList.forEach((character) => {
        characterContainer.innerHTML = `<div class="character-info">
        <div class="name">Name: ${character.name}</div>
        <div class="occupation">Occupation: ${character.occupation}</div>
        <div class="weapon">Weapon: ${character.weapon}</div>
        <div class="cartoon">Is a Cartoon? - ${character.cartoon}</div>        
      </div>`;
        characterContainer.appendChild(characterInfo);
      });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      const characterId = document.getElementById("character-id").value;
      console.log(characterId);
      const foundCharacter = await charactersAPI.getOneRegister(characterId);
      console.log(foundCharacter.data);
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      const characterId = document.getElementById("character-id-delete").value;
      await charactersAPI.deleteOneRegister(characterId);
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const characterId = document.getElementById("edit-character-id").value;
      const characterToUpdate = await charactersAPI.getOneRegister(characterId);
      const { id } = characterToUpdate.data;
      const cName = document.getElementById("edit-character-name").value;
      const cOccupation = document.getElementById(
        "edit-character-occupation"
      ).value;
      const cWeapon = document.getElementById("edit-character-weapon").value;
      const cCartoon = document.getElementById(
        "edit-character-cartoon"
      ).checked;
      const characterToCheck = {
        name: cName,
        occupation: cOccupation,
        weapon: cWeapon,
        cartoon: cCartoon,
      };
      console.log(characterToCheck);
      if (cName === "") {
        let editButton = document.getElementById("edit-character-button");
        editButton.setAttribute("class", "button-red");
      }

      await charactersAPI.updateOneRegister(id, characterToCheck);
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const cName = document.getElementById("new-character-name").value;
      const cOccupation = document.getElementById(
        "new-character-occupation"
      ).value;
      const cWeapon = document.getElementById("new-character-weapon").value;
      const cCartoon = document.getElementById("new-character-cartoon").checked;
      const newCharacter = {
        name: cName,
        occupation: cOccupation,
        weapon: cWeapon,
        cartoon: cCartoon,
      };
      await charactersAPI.createOneRegister(newCharacter);
    });
});
