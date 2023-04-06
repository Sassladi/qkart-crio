// import { Search, SentimentDissatisfied } from "@mui/icons-material";
// import {
//   CircularProgress,
//   Grid,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import axios from "axios";
// import { useSnackbar } from "notistack";
// import React, { useEffect, useState } from "react";
// import { config } from "../App";
// import Footer from "./Footer";
// import Header from "./Header";
// import "./Products.css";
// import ProductCard from "./ProductCard";
// import Cart, { generateCartItemsFrom } from "./Cart"


// // Definition of Data Structures used
// /**
//  * @typedef {Object} Product - Data on product available to buy
//  * 
//  * @property {string} name - The name or title of the product


// /**
//  * @typedef {Object} CartItem -  - Data on product added to cart
//  * 
//  * @property {string} name - The name or title of the product in cart
//  * @property {string} qty - The quantity of product added to cart
//  * @property {string} category - The category that the product belongs to
//  * @property {number} cost - The price to buy the product
//  * @property {number} rating - The aggregate rating of the product (integer out of five)
//  * @property {string} image - Contains URL for the product image
//  * @property {string} _id - Unique ID for the product
//  */


// const Products = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [load, setLoad] = useState(false)
//   const [allProducts, setAllProducts] = useState([]);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [searchProducts, setSearchProducts] = useState("");
//   const [debounce, setdebounce] = useState(0)
//   const [cartItems, setCartItems] = useState([])


//   function handleClick(event) {
//     console.log(event.target.value)
//     setSearchProducts(event.target.value)
//     performSearch(event.target.value)
//   }

//   const token = window.localStorage.getItem("token")
//   console.log(token)

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
//   /**
//    * Make API call to get the products list and store it to display the products
//    *
//    * @returns { Array.<Product> }
//    *      Array of objects with complete data on all available products
//    *
//    * API endpoint - "GET /products"
//    *
//    * Example for successful response from backend:
//    * HTTP 200
//    * [
//    *      {
//    *          "name": "iPhone XR",
//    *          "category": "Phones",
//    *          "cost": 100,
//    *          "rating": 4,
//    *          "image": "https://i.imgur.com/lulqWzW.jpg",
//    *          "_id": "v4sLtEcMpzabRyfx"
//    *      },
//    *      {
//    *          "name": "Basketball",
//    *          "category": "Sports",
//    *          "cost": 100,
//    *          "rating": 5,
//    *          "image": "https://i.imgur.com/lulqWzW.jpg",
//    *          "_id": "upLK9JbQ4rMhTwt4"
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 500
//    * {
//    *      "success": false,
//    *      "message": "Something went wrong. Check the backend console for more details"
//    * }
//    */
//   const performAPICall = async () => {
//     setLoad(true)
//     try {
//       // setSearchProducts(res.data)
//       const res = await axios.get(`${config.endpoint}/products`)
//       setLoad(false)
//       setAllProducts(res.data)
//       return (res.data)
//     }

//     catch (err) {

//       enqueueSnackbar("Could not fetch products. Check that the backend is running, reachable and returns valid JSON.", { variant: "warning" })
//     }

//   };
//   useEffect(() => {
//     let onLoad = async () => {
//       let res = await performAPICall()
//       let response = await fetchCart(token)
//       // console.log(response)
//       // console.log(res)
//       await setCartItems(generateCartItemsFrom(response, res))
//     }
//     onLoad();


//     // setCartItems(generateCartItemsFrom(response,res))
//     // setCartItems(res,response)

//   }, [])

//   // performAPICall();

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
//   /**
//    * Definition for search handler
//    * This is the function that is called on adding new search keys
//    *
//    * @param {string} text
//    *    Text user types in the search bar. To filter the displayed products based on this text.
//    *
//    * @returns { Array.<Product> }
//    *      Array of objects with complete data on filtered set of products
//    *
//    * API endpoint - "GET /products/search?value=<search-query>"
//    *
//    */
//   const performSearch = async (text) => {
//     // console.log("perform search!!!!!!!!")
//     try {
//       setSearchProducts(text)

//       const res = await axios.get(`${config.endpoint}/products/search?value=${text}`)
//       setFilterProducts(res.data)
//       return (res.data)
//     } catch (err) {
//       if (err.response.status === 404) {
//         setFilterProducts([])
//       }
//       else {
//         enqueueSnackbar("Could not fetch products. Check that the backend is running, reachable and returns valid JSON.", { variant: "warning" })
//       }
//     }
//   };

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
//   /**
//    * Definition for debounce handler
//    * With debounce, this is the function to be called whenever the user types text in the searchbar field
//    *
//    * @param {{ target: { value: string } }} event
//    *    JS event object emitted from the search input field
//    *
//    * @param {NodeJS.Timeout} debounceTimeout
//    *    Timer id set for the previous debounce call
//    *
//    */
//   const debounceSearch = (event, debounceTimeout) => {
//     const items = event.target.value;

//     if (debounce) {
//       clearTimeout(debounce)
//     }
//     const timeOut = setTimeout(() => {
//       // console.log("5ms after search")
//       performSearch(items)
//     }, 500)

//     setdebounce(timeOut)
//   };




//   /**
//    * Perform the API call to fetch the user's cart and return the response
//    *
//    * @param {string} token - Authentication token returned on login
//    *
//    * @returns { Array.<{ productId: string, qty: number }> | null }
//    *    The response JSON object
//    *
//    * Example for successful response from backend:
//    * HTTP 200
//    * [
//    *      {
//    *          "productId": "KCRwjF7lN97HnEaY",
//    *          "qty": 3
//    *      },
//    *      {
//    *          "productId": "BW0jAAeDJmlZCF8i",
//    *          "qty": 1
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 401
//    * {
//    *      "success": false,
//    *      "message": "Protected route, Oauth2 Bearer token not found"
//    * }
//    */
//   const fetchCart = async (token) => {
//     let arr = []
//     if (!token) return (arr);

//     try {
//       const headers = { Authorization: `Bearer ${token}` }

//       const request = await axios.get(`${config.endpoint}/Cart`, { headers })

//       // console.log(allProducts)

//       setCartItems(generateCartItemsFrom(request.data, allProducts))

//       return (request.data)
//       // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
//     } catch (e) {
//       if (e.response && e.response.status === 400) {
//         enqueueSnackbar(e.response.data.message, { variant: "error" });
//       } else {
//         enqueueSnackbar(
//           "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
//           {
//             variant: "error",
//           }
//         );
//       }
//       return null;
//     }
//   };


//   // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
//   /**
//    * Return if a product already is present in the cart
//    *
//    * @param { Array.<{ productId: String, quantity: Number }> } items
//    *    Array of objects with productId and quantity of products in cart
//    * @param { String } productId
//    *    Id of a product to be checked
//    *
//    * @returns { Boolean }
//    *    Whether a product of given "productId" exists in the "items" array
//    *
//    */


//   const isItemInCart = (items, productId) => {
//     if(!items.length) return ;
//     for (let i = 0; i < items.length; i++) {
//       if (items[i]["productId"] === productId) {
//         // enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.",{variant:"warning"})
//         return true;
//       }
//     }
//     return false;
//   };



//   /**
//    * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
//    *
//    * @param {string} token
//    *    Authentication token returned on login
//    * @param { Array.<{ productId: String, quantity: Number }> } items
//    *    Array of objects with productId and quantity of products in cart
//    * @param { Array.<Product> } products
//    *    Array of objects with complete data on all available products
//    * @param {string} productId
//    *    ID of the product that is to be added or updated in cart
//    * @param {number} qty
//    *    How many of the product should be in the cart
//    * @param {boolean} options
//    *    If this function was triggered from the product card's "Add to Cart" button
//    *
//    * Example for successful response from backend:
//    * HTTP 200 - Updated list of cart items
//    * [
//    *      {
//    *          "productId": "KCRwjF7lN97HnEaY",
//    *          "qty": 3
//    *      },
//    *      {
//    *          "productId": "BW0jAAeDJmlZCF8i",
//    *          "qty": 1
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 404 - On invalid productId
//    * {
//    *      "success": false,
//    *      "message": "Product doesn't exist"
//    * }
//    */
//   const addToCart = async (
//     token,
//     items,
//     products,
//     productId,
//     qty,
//     options = { preventDuplicate: false }
//   ) => {
//     // console.log("add to cart clicked!!!!!");
//     if (!token) {
//       enqueueSnackbar("Login to add an item to the Cart", { variant: "warning" })
//     }

//     if (options.preventDuplicate && isItemInCart(items, productId)) {
//       enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.", { variant: "warning" })
//     }
//     try {
//       const headers = { Authorization: `Bearer ${token}` }
//       const options = {
//         "productId": `${productId}`,
//         "qty": qty
//       }

//       const request = await axios.post(`${config.endpoint}/Cart`, options, { headers })

//       // console.log(allProducts)

//       setCartItems(generateCartItemsFrom(request.data, allProducts))

//       return (request.data)
//       // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
//     }
//     catch (err) {
//       if (err.response) {
//         enqueueSnackbar(err.response.data.message, { variant: "error" })
//       }
//       else {
//         enqueueSnackbar(
//           "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
//           {
//             variant: "error",
//           }
//         )
//       }
//     }
//   };



//   return (
//     <div>
//       <Header>
//         {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}

//         <TextField
//           className="search-desktop"
//           size="small"
//           // fullWidth
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <Search color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           onChange={(event) => debounceSearch(event, debounce)}
//           placeholder="Search for items/categories"
//           name="search"
//         />

//       </Header>

//       {/* Search view for mobiles */}
//       <TextField
//         className="search-mobile"
//         size="small"
//         fullWidth
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <Search color="primary" />
//             </InputAdornment>
//           ),
//         }}
//         placeholder="Search for items/categories"
//         name="search"
//       />
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={true} className="product-grid">
//           <Grid container>
//             <Grid item xs={12}>
//               <Box className="hero">
//                 <p className="hero-heading">
//                   India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
//                   to your door step
//                 </p>
//               </Box>
//             </Grid>



//             {load ?
//               (
//                 <Box className="loading">
//                   <CircularProgress

//                     // style={{padding:"50px"}}
//                     value={25}
//                     color="success" />
//                   <h4>Loading Products...</h4>
//                 </Box>) :
//               (searchProducts.length ? (filterProducts.length !== 0 ?
//                 (
//                   filterProducts.map((product) => (
//                     <Grid item xs={6} key={product._id}>
//                       <ProductCard
//                         product={product}
//                         handleAddToCart={() => {
//                           addToCart(token,
//                             cartItems,
//                             allProducts,
//                             product._id,
//                             1,
//                             { preventDuplicate: true })
//                         }}
//                       />
//                     </Grid>
//                   )
//                   )

//                 ) : <Box className="loading">
//                   <SentimentDissatisfied color="action" />
//                   <h4 style={{ color: '#636363' }}>
//                     No Products Found </h4>
//                 </Box>) :

//                 (allProducts.map((product) => (
//                   <Grid item xs={6} md={3} key={product._id}>
//                     <ProductCard
//                       product={product}
//                       handleAddToCart={() => {
//                         addToCart(token,
//                           cartItems,
//                           allProducts,
//                           product._id,
//                           1,
//                           { preventDuplicate: true })
//                       }}
//                     />

//                   </Grid>
//                 )
//                 )


//                 )

//               )

//             }
//           </Grid>

//         </Grid>

//         {token ?
//           <Grid item xs={12} md={3} className="cart-background">
//             <Cart
//               products={allProducts}
//               items={cartItems}
//               handleQuantity={addToCart}
//             />
//           </Grid> : (true)}
//       </Grid>


//       <Footer />
//     </div>
//   );
// };


// export default Products;
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart, { generateCartItemsFrom } from "./Cart";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */
const Products = () => {
  const [state, setState] = useState({
    data: [],
    items: [],
    isLoading: false,
  });
  const [debouncetimeout, setdebounceTimeout] = useState(
    setTimeout(() => {}, 500)
  );
  const [username, setUsername] = useState("");
  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    if(localStorage.getItem("username") !== null){
      setUsername(localStorage.getItem("username"));
    }
    performAPICall();
    console.log(state.items);
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call  to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    try {
      const res = await axios.get(config.endpoint + "/products");
      setState((prev) => ({ ...prev, data: res.data }));
      // console.log(username);
      // if(username.length>0){
        fetchCart(localStorage.getItem("token"));
      // }
    } catch (err) {
      // console.log(err);
    }
    setState((prev) => ({ ...prev, isLoading: false }));
  };
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await axios.get(
        config.endpoint + "/products/search?value=" + text.toLowerCase()
      );
      setState((prev) => ({ ...prev, data: res.data }));
    } catch (err) {
      // console.log(err.response.status);
      if (err.response.status === 404) {
        setState((prev) => ({ ...prev, data: [] }));
      }
    }
    setState((prev) => ({ ...prev, isLoading: false }));
  };
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    clearTimeout(debounceTimeout);
    setdebounceTimeout(
      setTimeout(() => {
        performSearch(event.target.value);
      }, 500)
    );
  };



  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  const fetchCart = async (token) => {
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      let response = await axios.get(`${config.endpoint}/cart`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      })
      
      // setState((prev) => ({...prev, items: generateCartItemsFrom(response.data, prev.data) }))
      setState((prev) => ({...prev, items: response.data}))
      // console.log(response.data);
    } catch (e) {
      if (e.response && e.response.status >= 400 && e.response.staus <= 409) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
    // console.log(state.items)
  };


  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    return items.some((item) => (item.productId === productId))
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    // console.log("Add To Cart");
    if(!token){
      enqueueSnackbar("Login to add an item to the Cart", {variant: "warning"});
      return;
    }
    if(options.preventDuplicate){
      // console.log(isItemInCart(items, productId))
      if(isItemInCart(items, productId)){
      enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.", {variant:"warning"});
      return;}
    }
    try{
      let response = await axios.post(`${config.endpoint}/cart`, {
        "productId": productId,
        "qty": qty
        }, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
      });
      setState((prev) => ({...prev, items: response.data}));
    }
    catch(error){
      if(error.response && error.response.status >= 400 && error.response.staus <= 409){ 
        enqueueSnackbar(error.response.data.message, {variant: "error"});
      }
    }
  };


  return (
    <div>
      <Header>
      <Box width={"30%"}>
          
          <TextField
            onChange={(e) => debounceSearch(e, debouncetimeout)}
            className="search-desktop"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Search for items/categories"
            name="search"
          />
        </Box>

      </Header>

      <TextField
        onChange={(e) => debounceSearch(e, debouncetimeout)}
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        
        <Grid container>
          
          <Grid item className="product-grid" xs={12} md={username.length>0 ? 9:12}>
            
            <Box className="hero">
              
              <p className="hero-heading">
                
                India’s <span className="hero-highlight">
                  FASTEST DELIVERY
                </span>{" "}
                to your door step
              </p>
            </Box>
            {state.isLoading && (
              <Box style={{ textAlign: "center" }}>
                
                <CircularProgress style={{ margin: "1rem auto" }} />
                <p>Loading Products</p>
              </Box>
            )}
            {state.data.length === 0 && (
              <Box style={{ textAlign: "center" }}>
                
                <SentimentDissatisfied style={{ margin: "1rem auto" }} />
                <p>No products found</p>
              </Box>
            )}
            <Grid
              container
              spacing={2}
              sx={{
                paddingLeft: 2,
                paddingBottom: 4,
                paddingTop: 4,
                paddingRight: 2,
              }}
            >
              {state.data.length > 0 && state.data.map((prod) => (
                  <Grid key={prod._id} item xs={6} md={3}>
                    <ProductCard
                      product={prod}
                      handleAddToCart={addToCart}
                      products={state.data}
                      items={state.items}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
          {(username.length > 0) &&  
          <Grid item xs={12} md={3} style={{backgroundColor: "#E9F5E1"}}>
            <Cart
              isReadOnly={false}
              products={state.data}
              items={generateCartItemsFrom(state.items, state.data)}
              handleQuantity={addToCart}
            />
          </Grid>
          }
        </Grid>
      </Box>
        {/* TODO: CRIO_TASK_MODULE_CART - Display the Cart component */}
      <Footer />
    </div>
  );
};
export default Products;
