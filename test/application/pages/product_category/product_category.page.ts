
import { TopNavigateMenuComponent } from "../components/top_navigate_menu/top_navigate_menu.components"
import { ProductCardComponent } from "./components/product_card.component"

export class ProductCategoryPage {
    topNavigateMenuComponent: TopNavigateMenuComponent
    productCardComponent: ProductCardComponent
    constructor() {
        this.topNavigateMenuComponent = new TopNavigateMenuComponent()
        this.productCardComponent = new ProductCardComponent(this.root)
    }
    private get root(): WebdriverIO.Element {
        return $('#product-category')
    }

    getProductsList() {
        let elementsArray = []
        const lengthListResult = $$('#content .row .product-layout').length
        for (var currentElement = 1; currentElement < lengthListResult+1; currentElement++) {
            let element = $(`#content .row .product-layout:nth-child(${currentElement})`)
            if (element) {
                elementsArray.push({
                    index:currentElement,
                    link:element.$(' .caption a[href^="http"]').getAttribute('href'),
                    text:element.$(' .caption a[href^="http"]').getText(),
                    price:element.$(' .price').getText().replace('\nEx Tax: $100.00',''),
                })
            }

        }
        return elementsArray
    }

}
