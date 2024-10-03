import "../style/index.css";

function render(variables = {}) {
  console.log("Estas son las variables actuales: ", variables);

  const name = variables.name || "John";
  const lastName = variables.lastName || "Doe";
  const role = variables.role || "Web Developer";
  const city = variables.city || "Miami";
  const country = variables.country || "USA";

  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover === false) cover = "<div class='cover'></div>";

  const socialMediaPosition =
    variables.socialMediaPosition === "left"
      ? "position-left"
      : "position-right";

  const socialMediaLinks = `
    <ul class="${socialMediaPosition}">
      <li><a href="https://twitter.com/${variables.twitter || ""}"${
    !variables.twitter ? ' style="pointer-events: none; opacity: 0.5;"' : ""
  }><i class="fab fa-twitter"></i></a></li>
      <li><a href="https://github.com/${variables.github || ""}"${
    !variables.github ? ' style="pointer-events: none; opacity: 0.5;"' : ""
  }><i class="fab fa-github"></i></a></li>
      <li><a href="https://linkedin.com/in/${variables.linkedin || ""}"${
    !variables.linkedin ? ' style="pointer-events: none; opacity: 0.5;"' : ""
  }><i class="fab fa-linkedin"></i></a></li>
      <li><a href="https://instagram.com/${variables.instagram || ""}"${
    !variables.instagram ? ' style="pointer-events: none; opacity: 0.5;"' : ""
  }><i class="fab fa-instagram"></i></a></li>
    </ul>
  `;

  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${name} ${lastName}</h1>
      <h2>${role}</h2>
      <h3>${city}, ${country}</h3>
      <div class="social-media">${socialMediaLinks}</div>
    </div>
  `;

  // Generar el HTML dinámico con las variables del usuario
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${name} ${lastName}</h1>
      <h2>${role}</h2>
      <h3>${city}, ${country}</h3>
      <div class="social-media">${socialMediaLinks}</div> <!-- Asegura que la lista de redes sociales esté siempre presente -->
    </div>
  `;
}
/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
