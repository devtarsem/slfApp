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
        watchList : [],
        watchListIds : [],
        order_history : [],
        tickets : [],
        Loader : false,
        start :0,
        end : 20,
        gross_bill : 0,
        tax : 0,
        total : 0,
        nonCancelOrders : 0,
        confirmRetunsPanel : false,
        PaymentModeWhileReturning : '',
        setConfrimPanelOpen : async(mode)=>{
            set({confirmRetunsPanel : true , PaymentModeWhileReturning : mode})
        },
        setConfrimPanelClose : async()=>{
            set({confirmRetunsPanel : false})
        },
        Auth : false,
        sizeChartOpener : false,
        openSizeChart : async()=>{
            set({sizeChartOpener : true})
        }
        ,
        CloseSizeChart : async()=>{
            set({sizeChartOpener : false})
        }
        ,
        order_placed : false,
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
                set({Loader : true})
                axios({
                    method : "GET",
                    url : "https://demandbackend.onrender.com/api/v1/product/fetch-product-app"
                }).then(res=>{
                    if(res.data.status=='success'){
                        set({Loader : false, allProductsReference : res.data.data.products,allProducts : res.data.data.products.slice(get().start, get().end), homeProducts : res.data.data.products.slice(0,10)})
                    }
                })
            }else{
                set({allProductsReference : get().allProductsReference,homeProducts : get().homeProducts, allProducts: get().allProducts})
            }
        }

        ,

        fetchDetailsOfProduct : async(id)=>{
            console.log(id)
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

        ,

        deletingItemFromCart : async(id)=>{
            let cart = JSON.parse(localStorage.getItem("cartSLFnew"))
            cart = cart.filter(el=>{
                if(el.productId != id){
                    return el;
                }
            })

            let cartIds = get().cart_item_ids;
            cartIds = cartIds.filter(el=>{
                if(el != id){
                    return el
                }
            })

            console.log(cartIds)

            set({cart : cart, cart_item_ids : cartIds, details_of_product : {}})
            localStorage.setItem("cartSLFnew", JSON.stringify(cart))
            localStorage.setItem("cartSLFIds", JSON.stringify(cartIds))

            get().extractionWholeCartItems()
        }

        ,

        billingTheCart : async()=>{
            let extractedCart = get().extractedCart;
            let sum = 0;
            extractedCart.forEach(el=>{
                sum += Number(el.creds.units * el.item.price)
            })
            // alert(sum)
            let tax = 18;

            let total = sum + (sum*tax)/100;
            set({gross_bill : sum, tax : tax, total : total})
        }

        ,

        watchlistAdditionToSys : async(item)=>{
            if(localStorage.getItem('watchListSLF')){
                let list = JSON.parse(localStorage.getItem("watchListSLF"))
                let ids = JSON.parse(localStorage.getItem("watchListSLFIds"))
                ids = [...ids, item._id]
                list = [...list, item]
                localStorage.setItem("watchListSLF", JSON.stringify(list))
                localStorage.setItem("watchListSLFIds", JSON.stringify(ids))
                
                set({watchList : list, watchListIds : ids})
            }else{
                localStorage.setItem("watchListSLF", JSON.stringify([item]))
                localStorage.setItem("watchListSLFIds", JSON.stringify([item._id]))
                
                set({watchList : [item], watchListIds : [item._id]})
            }
        }

        ,

        cacheWatchList : async()=>{
            if(localStorage.getItem("watchListSLF")){
                let list = JSON.parse(localStorage.getItem("watchListSLF"))
                let id = JSON.parse(localStorage.getItem("watchListSLFIds"))
                set({watchList : list, watchListIds : id})

            }else{
                set({watchList : [], watchListIds : []})

            }
        }

        ,

        checkingAuth : async()=>{
            if(localStorage.getItem("SLFAuth")){
                set({Auth : false})
            }else{
                set({Auth : true})

            }
        }

        ,

        AccountOpening : async(obj, navigate)=>{
            set({Loader : true})
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/auth/signup",
                data : {
                    data : obj
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    const auth = {
                        token : res.data.data.token,
                        name : res.data.data.name,
                        phone : res.data.data.phone,
                    }

                    localStorage.setItem("SLFAuth", JSON.stringify(auth))
                    set({Loader : false, Auth : false})
                    navigate("/cart")
                }
            })
        }

        ,

        LoginToAccount : async(log, navigate)=>{
            set({Loader : true})
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/auth/login",
                data : {
                    phone : log.phone,
                    password : log.password,
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    const auth = {
                        token : res.data.data.token,
                        name : res.data.data.name,
                        phone : res.data.data.phone,
                    }

                    localStorage.setItem("SLFAuth", JSON.stringify(auth))
                    set({Loader : false, Auth : false})
                    navigate("/cart")
                }else{
                    Swal.fire({
                        title: 'Login failed',
                        text: res.data.data.msg,
                        icon: 'error',
                        confirmButtonText: 'close'
                    })
                    set({Loader : false})
                }
            })
        }

        ,

        PlacingOrderToDb : async(cart, tax, gross_bill)=>{
            let order_items = []
            cart.forEach(el=>{
                const obj = {
                    color : el.color,
                    count : el.units,
                    id : el.productId,
                    size : el.size,
                    name : el.name,
                    brand : el.brand,
                    price : el.price,
                    image : el.Images,
                    cancel : el.cancel,
                }
                order_items.push(obj)
            })
            let user_id = JSON.parse(localStorage.getItem("SLFAuth")).token
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/order/place",
                data : {
                    products : order_items ,
                    tax : tax*gross_bill/100,
                    bill : gross_bill,
                    user_id
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    set({nonCancelOrders : -1, order_placed : true, cart_item_ids : [],cart : [], tax : 18, gross_bill : 0, total : 0})
                    localStorage.setItem("cartSLFnew", JSON.stringify([]))
                    localStorage.setItem("cartSLFIds", JSON.stringify([]))
                }
            })
        }
        ,

        continueShopAfterOrderPalced : async()=>{
            set({order_placed : false})
        }

        ,

        placingOnlinePaidOrder : async(amount, navigate, cart, tax, gross_bill)=>{
            set({Loader : true})
            let order_items = []
            cart.forEach(el=>{
                const obj = {
                    color : el.color,
                    count : el.units,
                    id : el.productId,
                    size : el.size,
                    name : el.name,
                    brand : el.brand,
                    price : el.price,
                    image : el.Images,
                    cancel : el.cancel,
                }
                order_items.push(obj)
            })
            let user_id = JSON.parse(localStorage.getItem("SLFAuth")).token
            
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/order/online",
                data : {
                    amount
                }
            }).then(res=>{
                const options = {
                    key: import.meta.env.VITE_KEY_ID, // yaha apna TEST key_id lagao
                    amount: res.data.data.order.amount,
                    currency: "INR",
                    name: "Skylite Fashions",
                    description: "Test Transaction",
                    order_id: res.data.data.order.id,
                    handler: function (response) {
                        axios({
                            method : "POST",
                            url : "https://demandbackend.onrender.com/api/v1/order/verify",
                            data : {
                                products : order_items ,
                                tax : tax*gross_bill/100,
                                bill : gross_bill,
                                user_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            }
                        }).then(el=>{
                            if(el.data.status == 'success'){
                                set({Loader : false,nonCancelOrders : -1, order_placed : true, cart_item_ids : [],cart : [], tax : 18, gross_bill : 0, total : 0})
                                localStorage.setItem("cartSLFnew", JSON.stringify([]))
                                localStorage.setItem("cartSLFIds", JSON.stringify([]))
                            }else{
                                Swal.fire({
                                    title: 'Payment failed',
                                    text: 'We did not receive our payment, it is debited please raise the ticket.',
                                    icon: 'success',
                                    confirmButtonText: 'ok'
                                })
                                set({Loader : false})
                            }
                        })
                    },
                    prefill: {
                    name: "Tarsem Singh",
                    email: "ts946395@gmail.com",
                    contact: "9464403397",
                    },
                    theme: {
                    color: "#0066cb",
                    },
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            })
        }
        ,

        order_history_count : async(orders)=>{
            let sum = 0
            orders.forEach(el=>{
                if(el.cancel_status != 'cancelled'){
                    sum++
                }
            })
            set({nonCancelOrders : sum})
        }
        ,

        orderCancellation : async(id)=>{
            set({Loader : true})
            axios({
                method : "POSt",
                url : "https://demandbackend.onrender.com/api/v1/order/cancel",
                data : {
                    order_id : id,
                    token : JSON.parse(localStorage.getItem("SLFAuth")).token
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    set({Loader : false, order_history : res.data.data.orders})
                    get().order_history_count(res.data.data.orders)
                    
                }
            })
        }

        ,

        SKUOrdercancellation : async(order_id, sku_id)=>{
            set({Loader : true})
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/order/cancel-sku",
                data : {
                    order_id,
                    sku_id,
                    token : JSON.parse(localStorage.getItem("SLFAuth")).token

                }
            }).then(res=>{
                if(res.data.status=='success'){
                    set({cancelled_SKU:[],confirmRetunsPanel : false,Loader : false,order_history : res.data.data.orders})
                    get().order_history_count(res.data.data.orders)
                }
            })
        }
        
        ,

        resettingPlacedOrder_after_order : async()=>{
            set({order_placed : false})
        }

        ,

        OrdersHistory : async()=>{
            if(get().order_history.length == 0 || get().nonCancelOrders == -1){
                set({Loader : true})
                axios({
                    method : "POST",
                    url : "https://demandbackend.onrender.com/api/v1/order/track-orders",
                    data : {
                        token : JSON.parse(localStorage.getItem("SLFAuth")).token
                    }
                }).then(res=>{
                    if(res.data.status == 'success'){
                        console.log(res.data.data.orders)
                        set({Loader : false , order_history : res.data.data.orders})
                        get().order_history_count(res.data.data.orders)
                    }
                })
            }else{
                set({order_history : get().order_history})
                get().order_history_count(get().order_history)


            }
        }

        ,
        cancelled_SKU : [],
        cancelledSKUFetching : async()=>{
            set({Loader : true})
            if(get().cancelled_SKU.length == 0){
                axios({
                    method : "POST",
                    url : "https://demandbackend.onrender.com/api/v1/order/cancel-sku-fetch",
                    data : {
                        token : JSON.parse(localStorage.getItem("SLFAuth")).token
                    }
                }).then(res=>{
                    if(res.data.status=='success'){
                        set({Loader : false,cancelled_SKU : res.data.data.cancel_sku})
                    }
                })
            }else{
                set({Loader : false,cancelled_SKU : get().cancelled_SKU})

            }
        }

        ,

        raiseTicket : async(title, description)=>{
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/ticket/raise-ticket",
                data : {
                    token : JSON.parse(localStorage.getItem("SLFAuth")).token,
                    title,
                    description,
                    attachments : []
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    Swal.fire({
                        title: 'Ticket added',
                        text: 'You will get reply in next 24hrs.',
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                }
            })
        }

        ,

        allTickets : async()=>{
            if(get().tickets.length == 0){
                set({Loader : true})
                axios({
                    method : "POST",
                    url : "https://demandbackend.onrender.com/api/v1/ticket/all-open-tieckts",
                    data : {
                        token : JSON.parse(localStorage.getItem("SLFAuth")).token,
                        
                    }
                }).then(res=>{
                    if(res.data.status == 'success'){
                        console.log(res.data.data.tickets)
                        set({Loader : false, tickets : res.data.data.tickets})
                    }
                })
            }else{
                set({tickets : get().tickets})
            }
        }
        ,

        SendReplyToTicket : async(reply, tk_id)=>{
            set({Loader : true})
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/ticket/reply",
                data : {
                    reply,
                    tk_id,
                    recipent : "YOU",
                    token : JSON.parse(localStorage.getItem("SLFAuth")).token,
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    console.log(res.data.data.tickets)
                    set({Loader : false, tickets : res.data.data.tickets})
                }
            })
        }

        ,

        SetNewpassword : async(old,newP)=>{
            axios({
                method : "POST",
                url : "https://demandbackend.onrender.com/api/v1/auth/change-password",
                data : {
                    old,
                    newP,
                    token : JSON.parse(localStorage.getItem("SLFAuth")).token,

                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    Swal.fire({
                        title: 'password changed',
                        text: 'new password is set, you can logout now.',
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                }else{
                    Swal.fire({
                        title: 'old password is wrong',
                        text: 'Try again with another password.',
                        icon: 'error',
                        confirmButtonText: 'ok'
                    })
                }
            })
        }
        ,

        //////  filters  ///////
        filterByPrice : async(from,to)=>{
            let products = JSON.parse(localStorage.getItem("SLMProds")).slice(get().start, get().end)
            products = products.filter(el=>{
                if(el.price >= from && el.price <= to){
                    return el
                }
            })
            set({allProducts : products, filters : false})
        }
        ,
        filterByColor : async(color)=>{
            let products = JSON.parse(localStorage.getItem("SLMProds")).slice(get().start, get().end)
            products = products.filter(el=>{
                if(el.colors.includes(color)){
                    return el
                }
            })
            set({allProducts : products, filters : false})
        }
        ,
        filterBySize : async(size)=>{
            let products = JSON.parse(localStorage.getItem("SLMProds")).slice(get().start, get().end)
            products = products.filter(el=>{
                if(el.sizes.includes(size)){
                    return el
                }
            })
            set({allProducts : products, filters : false})
        }

        ,

        resetFilters : async()=>{
            let products = JSON.parse(localStorage.getItem("SLMProds")).slice(get().start, get().end)
            set({allProducts : products, filters : false})


        }
    })

    
)

export default productStore