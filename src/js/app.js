import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables);
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  let fullName = `${variables.name || "First Name"} ${variables.lastName ||
    "Last Name"}`;

  let location = `${variables.city || "City"}, ${variables.country ||
    "Country"}`;

  let socialMediaIcons = `
    <ul class="${variables.socialMediaPosition || "position-right"}">
      ${
        variables.twitter
          ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
          : ""
      }
      ${
        variables.github
          ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
          : ""
      }
      ${
        variables.linkedin
          ? `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
          : ""
      }
      ${
        variables.instagram
          ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
          : ""
      }
    </ul>`;

  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL ||
        "https://randomuser.me/api/portraits/men/10.jpg"}" class="photo" />
      <h1>${fullName}</h1>
      <h2>${variables.role || "Job Title"}</h2>
      <h3>${location}</h3>
      ${socialMediaIcons}
    </div>
  `;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-right",
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
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for"); // cuando cambia algún input, toma el valor
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // re-renderiza la tarjeta con los nuevos valores
    });
  });
};
