# Burger 

Full stack JavaScript app （client side）that lets users log in to customize burger and order pizza at restaurants in specific suburb.

### User Stories

1. As an unauthenticated user, I can search restaurants in specific suburb.
2. As an unauthenticated user, I can customize burger and choose pizza menu items.
3. As an unauthenticated user, I can sign up locally, sign in locally or using facebook, google account.
4. As an unauthenticated user, I will be prompted to log in if I tried to order
5. As an authenticated user, I can add my customized burger and pizza menu items to shoppingcart.
6. As an authenticated user, I can view items in my shoppingcart.
7. As an authenticated user, I can fill my address to finalize buying.
8. As an authenticated user, I can view orders.
9. As an authenticated user, I can log out.
10. the GUI will display responsively on screen with different widths and height.
11. Any error(GUI error,network error,system error etc)will get immediately clear hint on the current page or a modal dialog

### animation of senario
![Alt Text]()


### Technology Used:

* Passport (Local/JWT/Facebook)
* React
* Redux
* React-Redux
* Semantic-ui-react
* Redux Form
* React google maps
* React thunk
* Webpack
* Babel
* sass
* jest
* enzyme


### Installation:

Provided NPM are installed, enter the following CLI command to install dependencies:
```
$ npm install
```

### Usage:

First , Run the server code at [BurgerServer] (https://github.com/SueCheng/BurgerServer) , Then a Google map key is required,modify the GOOGLE_MAP_KEY to your own in the /config/googleMapKey.js file.

To run the development version,enter the following command:
```
$npm run start

```
To build the production version,enter the following command:
```
$npm run build

```
To run tests,enter the following command:
```
$npm run test

```
### Heroku Demo:

You can view a live demo of the app at https://burgerserver.herokuapp.com/