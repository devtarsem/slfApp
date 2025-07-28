import {create} from 'zustand'
import axios from 'axios'
import Swal from 'sweetalert2'

const productStore = create(
    (set,get)=>({
        homeProducts : [],
        allProducts : [],
        allProductsReference : [],
        cart : [],
        cart_item_ids : [],
        extractedCart :[],
        start :0,
        end : 20,
        details_of_product : {},
        extracted_item_FromCart : {},
        filters : false,
        openFilters : async()=>{
            set({filters : true})
        }

        ,
        closeFilters : async()=>{
            set({filters : false})
        }
        ,

        fetchingProducts : async()=>{
            if(get().homeProducts.length == 0 || get().allProducts.length == 0){
                axios({
                    method : "GET",
                    url : "http://127.0.0.1:3003/api/v1/product/fetch-product-app"
                }).then(res=>{
                    if(res.data.status=='success'){
                        set({allProductsReference : res.data.data.products,allProducts : res.data.data.products.slice(get().start, get().end), homeProducts : res.data.data.products.slice(0,10)})
                    }
                })
            }else{
                set({allProductsReference : get().allProductsReference,homeProducts : get().homeProducts, allProducts: get().allProducts})
            }
        }

        ,

        fetchDetailsOfProduct : async(id)=>{
            if(get().allProducts.length == 0){
                get().fetchingProducts()
            }

            let products = get().allProducts;
            console.log(id)

            products = products.filter(el=>{
                if(el._id == id){
                    return el;
                }
            })
            console.log(products)

            set({details_of_product : products[0]})
        }
        ,
        nextProductsToPagination : async()=>{
            let start = get().start;
            let end = get().end;

            const allProds = get().allProductsReference.slice(start+20,end+20);
            set({start : start+20, end : end+20, allProducts : allProds})
        }
        ,
        prevProductsToPagination : async()=>{
            let start = get().start;
            let end = get().end;

            const allProds = get().allProductsReference.slice(start-20 > 0 ? start-20 : 0,end-20 > 0 ? end-20 : 20);
            set({start : start-20 > 0 ? start-20 : 0, end : end-20 > 0 ? end-20 : 20, allProducts : allProds})
        }
        ,

        searchProducts : async(str)=>{
            let prods = get().allProductsReference.slice(get().start, get().end);
            prods = prods.filter(el=>{
                if(el.name.toLowerCase().includes(str.toLowerCase())){
                    console.log(el)
                    return el;
                }
            })

            if(str == ''){
                set({allProducts :  get().allProductsReference.slice(get().start, get().end)})

            }
            set({allProducts : prods})
        }

        ,

        addingItemstoCart : async(item)=>{
            const cart = JSON.parse(localStorage.getItem("cartSLFnew"))
            if(cart.length == 0){
                set({cart : [item], cart_item_ids : [item.productId]})
                localStorage.setItem("cartSLFnew", JSON.stringify([item]))
                localStorage.setItem("cartSLFIds", JSON.stringify([item.productId]))
                
            }else{
                
                localStorage.setItem("cartSLFnew", JSON.stringify([...get().cart, item]))
                localStorage.setItem("cartSLFIds", JSON.stringify([...get().cart_item_ids, item.productId]))
                
                set({cart : [...get().cart, item], cart_item_ids : [...get().cart_item_ids, item.productId]})

            }

            get().extratingItemPresentInCartOrNot(item.productId)

            Swal.fire({
                title: 'success',
                text: 'Item added to cart',
                icon: 'success',
                confirmButtonText: 'ok'
            })
        }

        ,

        settingUpCart : async()=>{
            if(localStorage.getItem("cartSLFnew")){
                const cart = JSON.parse(localStorage.getItem("cartSLFnew"))
                const ids = JSON.parse(localStorage.getItem("cartSLFIds"))
                set({cart : cart, cart_item_ids : ids})
            }else{
                localStorage.setItem("cartSLFnew", JSON.stringify([]))
                localStorage.setItem("cartSLFIds", JSON.stringify([]))
            }
        }

        ,

        extratingItemPresentInCartOrNot : async(id)=>{
            let cart = JSON.parse(localStorage.getItem("cartSLFnew"))
            cart = cart.filter(el=>{
                if(el.productId == id){
                    return el
                }
            })


            if(cart.length == 0){
                set({extracted_item_FromCart : {}})
            }else{
                set({extracted_item_FromCart : cart[0]})
            }
        }

        ,

        updatingCart : async(item)=>{
            const cart = JSON.parse(localStorage.getItem("cartSLFnew"))
            cart.forEach(el=>{
                if(el.productId == item.productId){
                    el.size = item.size,
                    el.color = item.color,
                    el.units = item.units
                }
            })

            localStorage.setItem("cartSLFnew", JSON.stringify(cart))
            set({cart : cart})
            get().extratingItemPresentInCartOrNot(item.productId)
            
            Swal.fire({
                title: 'success',
                text: 'Cart Updated',
                icon: 'success',
                confirmButtonText: 'ok'
            })
        }

        ,

        extractionWholeCartItems : async()=>{
            const allProds = get().allProductsReference
            const cart = JSON.parse(localStorage.getItem("cartSLFnew"))
            let extractdCart = [];
            cart.forEach(el=>{
                allProds.forEach(prod=>{
                    if(prod._id == el.productId){
                        let obj = {
                            item : prod,
                            creds : el
                        }
                        extractdCart.push(obj)
                    }
                })
            })
            console.log(extractdCart)
            set({extractedCart : extractdCart})
        }
    })

    
)

export default productStore