 
/* menu open and close*/
var menu_icon=document.getElementById('menu');
var menu_items=document.getElementById('menu-items');
menu_icon.addEventListener('click' ,()=>{
    menu_items.classList.toggle("menu-i");
}) 

/*Cart open and close*/
var cartOpen=document.getElementById('cartIcon')
var cartClose=document.getElementById('close-cart');
var cart=document.getElementById('cart-in')

cartOpen.onclick=function(){
    cart.classList.add('active');
}

cartClose.onclick=function(){
    cart.classList.remove('active');
}



// Account section open and close

var open1=document.getElementById('a-open');
var open2=document.getElementById('a-open1');
var close1=document.getElementById('acc-close');
var pro=document.getElementById('pr');

open1.onclick=function(){
    pro.classList.add('aaa');
}
open2.onclick=function(){
    pro.classList.add('aaa');
}
close1.onclick=function(){
    pro.classList.remove('aaa');
}




/* cart feature */


//remove item from cart
var removeCart=document.getElementsByClassName('cart-remove')
for (var i=0;i<removeCart.length;i++){
    var removeitm=removeCart[i];
    removeitm.addEventListener('click',removeitem);
}

function removeitem(event){
    var b=event.target;
    b.parentElement.remove();
    updateCartTotal()
}



//add item to cart

var addCart=document.getElementsByClassName('add-cart');

for (var i=0; i<addCart.length;i++){
    var addItm=addCart[i]
    addItm.addEventListener('click', addItem)
}

function addItem(event){
    var b =event.target
    var box=b.parentElement
    var title=box.getElementsByClassName('p-name')[0].innerText
    var price=box.getElementsByClassName('p-price')[0].innerHTML
    var img=box.getElementsByClassName('p-image')[0].src
    console.log(title,price,img)
    addItemToCart(title,price,img)
}


function addItemToCart(title,price,img){
    var cartrow=document.createElement('div')
    cartrow.classList.add('cart-box')
    var cartcontents=document.getElementsByClassName('cart-content')[0]
    var productName=cartcontents.getElementsByClassName('cart-product-title')
    for (var i=0;i<productName.length;i++){
        if (productName[i].innerText==title){
            alert('Item already in cart')
            return
        }
    }
    
    
    var cartRowContents=`<img src="${img}" alt="" class="cart-img">
                         <div class="detail-box">
                             <div class="cart-product-title">${title}</div>
                             <div class="cart-price">${price}</div>
                             <input type="number" value="1" class="cart-quantity">
                         </div>
                         <i class="bx bxs-trash-alt cart-remove"></i>`

    cartrow.innerHTML = cartRowContents
    cartcontents.append(cartrow)
    cartrow.getElementsByClassName('cart-remove')[0].addEventListener('click', removeitem);
    cartrow.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
    updateCartTotal()

}


//cart calculations

function updateCartTotal(){
    var total=0;
    var cartcontents=document.getElementsByClassName('cart-content')[0];
    var cartboxes=cartcontents.getElementsByClassName('cart-box');
    if (cartboxes.lenth==0){
        total=0
    }
    else{

    for (var i=0; i<cartboxes.length;i++){
        var cartbox=cartboxes[i];
        var priceelement=cartbox.getElementsByClassName('cart-price')[0];
        var quantityelement=cartbox.getElementsByClassName('cart-quantity')[0];
        var quantity=quantityelement.value;
        var price=parseFloat(priceelement.innerHTML.replace("$",''));
        total+=price*quantity;
        
        total=Math.round(total*100)/100;
    }
    }
    document.getElementsByClassName('total-price')[0].innerHTML = "$"+total;
}

//quantity change

function quantityChanged(event){
    var input=event.target
    if (isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateCartTotal()
}