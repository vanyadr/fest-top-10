async function fetchData(link) {
   try {
      const response = await fetch(link, { method: "GET" });

      if (!response.ok) throw new Error();

      return await response.json();
   } catch (error) {
      return null;
   }
}
async function renderData() {
   const container = document.querySelector("#root");
   const loader = document.querySelector("#loader");

   loader.classList.add("loading");
   const positions = await fetchData("https://beer.datacraft.su/popular2.php");
   loader.classList.remove("loading");

   if (!positions) {
      container.innerHTML = `
         <div class="error">
            <h2>Не удалось загрузить данные... Обновите страницу</h2>
         </div>`;
   }

   const classes = ["first", "second", "third"];
   const items = [];

   positions.slice(0, 10).forEach((item, key) => {
      items.push(
         `<div class="item ${key < 3 ? classes[key] : ""}">
            <div class="item__pic">
               <img src="${item.photo}" alt="${item.name}" />
            </div>
            <div class="item__info">
               <h2 class="">${item.name})</h2>
               <div class="item__feedback">
                  <span class="item__rate">Рейтинг: ${item.rate}★</span>
                  <span class="item__reviews">Отзывы: ${item.reviews}</span>
               </div>
            </div>
         </div>`
      );
   });

   container.innerHTML = items.join("");
}

document.addEventListener("DOMContentLoaded", () => {
   renderData();
});
