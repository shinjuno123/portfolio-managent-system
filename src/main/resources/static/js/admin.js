function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
	
}

(function addCategoryMain() {
	function addCategory(article) {
		const addButton = $(`#${article} > .category-buttons > .add`);

		const buttonHtml = (categoryId) => `
    <div
    class="col col-md-2 py-3 category-button position-relative"
    data-bs-target="#${categoryId}"
    >
        <button style="width:fit-content;height:fit-content;" class="position-absolute event-false d-flex align-items-center btn btn-primary top-0 end-0 px-2 py-2 rounded-circle">
            <span class="material-symbols-outlined" style="font-size:1rem;">
                delete
            </span>
        </button>
        <div>
            <input type="text" class="form-control" id="floatingInput" placeholder="category">
        </div>
    </div>
    `;

		const categoryDetail = (categoryId) => `
    <div class="row ms-1 category" id="${categoryId}" style="display:none;">
        <ul class="d-flex flex-wrap">
            <li
                class="px-3 m-2 rounded add-item-false-event d-flex align-items-center"
                style="cursor: pointer"
            >
                <span class="material-symbols-outlined text-light my-3">
                    add_circle
                </span>
            </li>
        </ul>
    </div>
    `;

		addButton.click(function(event) {
			const button = $(event.delegateTarget);
			const articleElement = $(`#${article}`);
			const lastDetailElement = $(
				articleElement.children()[articleElement.children().length - 2]
			);
			const lastCategoryButton = $(
				$(articleElement.children()[2]).children()[
				$(articleElement.children()[2]).children().length - 1
				]
			);
			const categoryId = uuidv4();
			lastDetailElement.after(categoryDetail(categoryId));
			lastCategoryButton.before(buttonHtml(categoryId));
			showCategoryContent(article);
			addItemsInCategoryMain();
			removeCategoryMain();

			// trigger clicking created category button!
			const prevButton = $(button.siblings()[button.siblings().length - 1]);
			prevButton.trigger("click");
		});
	}
	addCategory("technology-article");
})();

// remove category button
function removeCategoryMain() {
	function removeCategory(article) {
		const categoryButtons = $(
			`#${article} > .category-buttons > .category-button > .event-false`
		);

		categoryButtons.each((index) => {
			const categoryButton = $(categoryButtons[index]);
			categoryButton.click(function() {
				const id = $(categoryButton.parent()).attr("data-bs-target");
				$(id).remove();

				categoryButton.parent().remove();
			});

			categoryButton.removeClass("event-false");
		})


	}

	removeCategory("technology-article");
}
removeCategoryMain();
// add items in technology category
function addItemsInCategoryMain() {
	function addItemsInCategory(article) {
		const categoryItems = $(
			`#${article} > .category > ul > .add-item-false-event`
		);

		const listItem = () => `
        <li
            class="position-relative px-3 py-2 m-2 border border-primary rounded d-flex align-items-center"
            style="background: #0a2647"
        >
            <button style="width:fit-content;height:fit-content;" class="position-absolute event-false d-flex align-items-center btn btn-primary top-0 end-0 px-2 py-2 rounded-circle">
                <span class="material-symbols-outlined" style="font-size:1rem;">
                delete
                </span>
            </button>
            <div>
                <input type="text" class="form-control" id="floatingInput" placeholder="Skill">
            </div>
           
        </li>
    `;

		function categoryEvent(event) {
			const button = $(event.delegateTarget);
			const parentId = button.parent().parent().attr("id");
			button.before(listItem());
			removeItemInCategoryMain(parentId);
		}

		categoryItems.click(categoryEvent);
		categoryItems.removeClass("add-item-false-event");
	}
	addItemsInCategory("technology-article");
}

addItemsInCategoryMain();

function removeItemInCategoryMain(id) {
	function removeItemInCategory(id) {
		const item = $(`#${id} > ul > li > .event-false`);

		item.click(function() {
			item.parent().remove();
		});

		item.removeClass("event-false");
	}
	removeItemInCategory(id);
}
