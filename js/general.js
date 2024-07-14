const toggleCourse = (selector) => {
	const btns = document.querySelectorAll(selector)
	btns.forEach(btn => {
		btn.addEventListener("click", () => {
			localStorage.setItem("type", JSON.stringify(btn.dataset.type))
		})
	})
}
toggleCourse(".toggle-course")

/* Courses */
class Shop {
	constructor(selector, title, url) {
		this.selector = document.querySelector(selector)
		this.url = url
		this.title = document.querySelector(title)
		this.type = JSON.parse(localStorage.getItem("type")) || " "
	}
	render(data) {
		const html = data.map(card => `	<div class="card" style="width: 18rem;">
			<img src="./images/courses/${card.name}.jpg" class="card-img-top" alt="${card.name}">
			<div class="card-body">
				<h5 class="card-title">${card.name}</h5>
				<p class="card-text">${card.motto}</p>
				<a style='background-color:#ef8701' href="#" class="btn btn-primary">Подробнее</a>
			</div>
		</div>`)
		if (this.selector) {
			this.selector.insertAdjacentHTML(
				"beforeend",
				html.join(" ")
			);
		}
	}
	async toHTML() {
		let response = await fetch(this.url);
		if (response.ok) {
			let json = await response.json();
			switch (this.type) {
				case "gym":
					this.render(json.gym)
					if (this.title) { this.title.innerHTML = "Курсы для зала" }

					break;
				case "home":
					this.render(json.home)
					if (this.title) { this.title.innerHTML = "Курсы для дома" }

					break;
				case "nutrition":
					this.render(json.nutrition)
					if (this.title) { this.title.innerHTML = "Программы питания" }

					break;
				case "marathon":
					this.render(json.marathon)
					if (this.title) { this.title.innerHTML = "Марафоны" }

					break;
				case "rehabilitation":
					this.render(json.rehabilitation)
					if (this.title) { this.title.innerHTML = "Программы реабилитации" }

					break;

				default:
					const data = [...json.gym, ...json.home, ...json.nutrition, ...json.rehabilitation, ...json.marathon]
					this.render(data)
					if (this.title) { this.title.innerHTML = "Мои курсы" }

					break;
			}

		} else {
			alert("Ошибка HTTP: " + response.status);
		}

	}
}


const shop = new Shop(".services-inner", ".courses-title", "/data.json")
shop.toHTML()
