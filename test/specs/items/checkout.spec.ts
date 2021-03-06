import { App } from "../../application/application"
import { ApiClient } from '../../application/api/apiClient'
var Faker = require('Faker');

describe('Checkout item', function () {
    describe('Checkout by register user', function () {
        beforeEach(function () {
            const app = new App()
            let userData = {
                firstName: Faker.name.firstName(),
                lastName: Faker.name.lastName(),
                email: Faker.internet.email(),
                telephone: Faker.random.number({
                    'min': 123456789,
                    'max': 999999999
                }),
                password: Faker.random.number({
                    'min': 123456,
                    'max': 999999
                }),
                newsLetter: 0,
                agree: 1
            }
            const user = new ApiClient().createNewUser(userData)
            browser.url('/')
        })
        it('can be purchased with different delivery and shipment address', function () {
            const app = new App()

            app.home.openAllForCategoryMP3()
            const iPodClassic = app.productCategory.getProductsList().find(product => product.text === 'iPod Classic')
            expect(iPodClassic).toBeDefined()

            app.productCategory.productCardComponent.addToCart(iPodClassic.index)

            app.productCategory.topNavigateMenuComponent.openCheckout();

            app.checkout.billingDetails.fillBillingDetails({
                newAddress: true,
                registerUser: true,
                firstCheckOut: true,
                firstName: Faker.name.firstName(),
                lastName: Faker.name.lastName(),
                email: null,
                telephone: null,
                address1: Faker.address.streetAddress(),
                city: Faker.address.city(),
                postCode: Faker.address.zipCode(),
                country: '220',
                region: '3490',
                sameShippingAddress: false
            })
            app.checkout.billingDetails.continue('registre')
            browser.pause(1000)
            app.checkout.deliveryDetails.fillDeliveryDetails({
                newAddress: true,
                registerUser: true,
                firstName: Faker.name.firstName(),
                lastName: Faker.name.lastName(),
                company: Faker.company.companyName(),
                address1: Faker.address.streetAddress(),
                city: Faker.address.city(),
                postCode: Faker.address.zipCode(),
                country: '220',
                region: '3490'
            })
            app.checkout.deliveryDetails.continue('registre')
            app.checkout.deliveryMethod.continue()

            app.checkout.paymentMethod.acceptTermsAndConditions()
            app.checkout.paymentMethod.continue()

            app.checkout.confirmOrder.continue()

            browser.waitUntil(() => app.confirmation.isOpened(), {
                timeoutMsg: "Expected confirmation page to be loaded"
            })
        })
        afterEach(function () {
            const app = new App()
            app.home.topNavigateMenuComponent.myAccountComponent.logout()
        })
    })
    describe('Checkout by guest user', function () {
        it('can be purchased with different delivery and shipment address', function () {
            const app = new App()

            app.home.openAllForCategoryMP3()

            const iPodShuffle = app.productCategory.getProductsList().find(product => product.text === 'iPod Shuffle')

            expect(iPodShuffle).toBeDefined()

            app.productCategory.productCardComponent.addToCart(iPodShuffle.index)

            app.productCategory.topNavigateMenuComponent.openCheckout();
            app.checkout.checkoutOptions.selectGuestCheckout()
            app.checkout.checkoutOptions.continue()

            app.checkout.billingDetails.fillBillingDetails({
                newAddress: true,
                registerUser: false,
                firstCheckOut: true,
                firstName: Faker.name.firstName(),
                lastName: Faker.name.lastName(),
                email: Faker.internet.email(),
                telephone: Faker.phone.phoneNumber(),
                address1: Faker.address.streetAddress(),
                city: Faker.address.city(),
                postCode: Faker.address.zipCode(),
                country: '220',
                region: '3490',
                sameShippingAddress: false
            })
            app.checkout.billingDetails.continue('guest')

            app.checkout.deliveryDetails.fillDeliveryDetails({
                newAddress: true,
                registerUser: false,
                firstName: Faker.name.firstName(),
                lastName: Faker.name.lastName(),
                company: Faker.company.companyName(),
                address1: Faker.address.streetAddress(),
                city: Faker.address.city(),
                postCode: Faker.address.zipCode(),
                country: '220',
                region: '3490'
            })
            app.checkout.deliveryDetails.continue('guest')
            app.checkout.deliveryMethod.continue()

            app.checkout.paymentMethod.acceptTermsAndConditions()
            app.checkout.paymentMethod.continue()

            app.checkout.confirmOrder.continue()

            browser.waitUntil(() => app.confirmation.isOpened(), {
                timeoutMsg: "Expected confirmation page to be loaded"
            })
        })
    })
})
   
    
