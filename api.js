const ENDPOINT = "https://randomuser.me/api/?results=100&inc=name&nat=us";

const get = async () =>
  await axios
    .get(ENDPOINT)
    .then(({ data }) => data.results)
    .catch((err) => err);

const generateBtn = document.querySelector("#btn");
const list = document.querySelector("#list");

const generateLiItem = (text) => {
  const element = document.createElement("li");
  element.innerText = text;

  const copyBtn = document.createElement("i");
  copyBtn.classList.add("fa-copy");
  copyBtn.classList.add("fa-solid");
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(text);
  });

  element.appendChild(copyBtn);

  return element;
};

generateBtn.addEventListener("click", async () => {
  if (list.innerHTML !== "") {
    list.innerHTML = "";
  }

  const results = await get();

  results.forEach(({ name: { first, last} }) => {
    const listItem = generateLiItem(first + " " + last);
    list.appendChild(listItem);
  });
});
