

function opentab(evt, tabName) {
    // Get all elements with class="tab-links"
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-contents");
    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active-link", "");
    }
    // Hide all tab content
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Show the current tab, and add an "active" class to the button that opened it
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active-link";
  }
  
    // Cart functionality
    let cartIcon = document.querySelector('#cart-icon');
    let cart = document.querySelector('.cart');
    let closeCart = document.querySelector('#close-cart');

    cartIcon.onclick = () => cart.classList.add("active");
    closeCart.onclick = () => cart.classList.remove("active");

    // Ensure the DOM is fully loaded before executing cart-related functions
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", ready);
    } else {
        ready();
    }

    function ready() {
        // Remove cart items
        var removeCartButtons = document.getElementsByClassName('remove-to-cart');
        Array.from(removeCartButtons).forEach(button => {
            button.addEventListener('click', removeCartItems);
        });

        // Quantity changes
        var quantityInputs = document.getElementsByClassName('cart-quantity');
        Array.from(quantityInputs).forEach(input => {
            input.addEventListener("change", quantityChanged);
        });

        // Add to cart
        var addCartButtons = document.getElementsByClassName("viewCart");
        Array.from(addCartButtons).forEach(button => {
            button.addEventListener("click", addCartClicked);
        });

        // Buy button
        document.querySelector(".btn-buy").addEventListener("click", buyButtonClicked);

        // Place order button
        document.querySelector(".place-order").addEventListener("click", placeOrderClicked);
    }


    function removeCartItems(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        updateTotal();
    }

    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
    }

    
    var current_product = null;
    var shopping_cart = [];
    
    function displayProduct(product) {
        toggle_popup();
    
        current_product = product;
    
        document.querySelector("#product_img").src = product.image; // Corrected selector
        document.querySelector("#product_name").innerHTML = product.name; // Corrected selector
        document.querySelector("#product_price").innerHTML = product.price; // Corrected selector
        document.querySelector("#product_desc").innerHTML = product.description; // Corrected selector
    }

    function addCartClicked(event) {
        var button = event.target;
        
        // Assuming you have access to the current product here
        var cart_item = {
            title: current_product.name,
            price: current_product.price,
            productIMG: current_product.image
        };
    
        addProductToCart(cart_item);
    }
    function addProductToCart(cart_item) {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
    
        var cartBoxContent = `
            <img src="${cart_item.productIMG}" alt="product" class="cart-img2">
            <div class="detail-box">
                <div class="cart-product-title">${cart_item.title}</div>
                <div class="cart-price">${cart_item.price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <a class="fa fa-trash remove-to-cart"></a>`;
    
        cartShopBox.innerHTML = cartBoxContent;
    
        // Add event listeners for removing and changing quantity
        cartShopBox.querySelector('.remove-to-cart').addEventListener('click', removeCartItems);
        cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
    
        // Check if the item already exists in the cart
        var cartContent = document.querySelector(".cart-content");
        var existingItem = cartContent.querySelector(`.cart-product-title[data-title="${cart_item.title}"]`);
        if (existingItem) {
            alert("You have already added this to your cart");
            return;
        }
        cartContent.appendChild(cartShopBox);
        updateTotal();
    }

    function updateTotal() {
        var cartContent = document.getElementsByClassName("cart-content")[0];
        var cartBoxes = cartContent.getElementsByClassName("cart-box");
        var total = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName("cart-price")[0];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            var price = parseFloat(priceElement.innerText.replace("₱", ""));
            var quantity = quantityElement.value;
            total += price * quantity;
        }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "₱" + total;
    }

    // Scroll to cart section on "Buy Now" button click
    let buyNowButton = document.querySelector(".btn-buy");
    let productCartSection = document.querySelector("#product_cart");

    buyNowButton.onclick = () => {
        productCartSection.style.display = "block";
        window.scrollTo({
            top: productCartSection.offsetTop,
            behavior: "smooth"
        });
    }

    

    /////////////////////////////////////

    function toggle_popup() {
        document.getElementById("previewMenu").classList.toggle("active");
    
    
        document.body.classList.toggle("popup-open");
    
        document.body.classList.toggle("popup-active");
        var backgroundElements = document.querySelectorAll("nav, .HomeContent, .Shop");
        backgroundElements.forEach(function(element) {
            element.classList.toggle("no-pointer-events");
        });
    }
    
    function toggle_remove() {
        var popup = document.getElementById("previewMenu");
        popup.classList.remove("active");
        document.body.classList.remove("popup-active");
    
        document.body.classList.remove("popup-open");
    
        var backgroundElements = document.querySelectorAll("nav, .HomeContent, .Shop");
        backgroundElements.forEach(function(element) {
            element.classList.remove("no-pointer-events");
        });
    }
    
    function toggleCart(){
        const shopping_cart=document.getElementById(shopProducts);
        shopProducts.classList.toggle('active');
        renderCartItems();
    }
    
    
    var jewel1 = {
        image: "images/stud_earrings.jpg",
        name: "Heart-shaped Stud Earrings",
        price: "₱ 559.99",
        description: "These are small earrings with a post that goes through the earlobe and a backing to secure them in place."
    };
    var jewel2 = {
        image: "images/hoop_earrings.jpg",
        name: "Diamond Hoop Earrings",
        price: "₱ 559.99",
        description: "They can be simple or adorned with gemstones, pearls, or other embellishments."
    };
    var jewel3 = {
        image: "images/dangle.jpg",
        name: "Butterfly Dangle Earrings",
        price: "₱ 559.99",
        description: "They are a popular choice for adding a touch of elegance or personality to an outfit."
    };
    var jewel4 = {
        image: "images/piercing.jpg",
        name: "Butterfly Ear Cuffs",
        price: "₱ 559.99",
        description: "They can be simple and thin or come in more elaborate designs like chains, climbers that travel up the ear, or even crawlers that seem to snake around the cartilage."
    };

    var jewel5 = {
        image: "images/pendant.jpg",
        name: "Water Drop Pendant Necklace",
        price: "₱ 559.99",
        description: "These necklaces feature a pendant, which is a small ornamental piece that hangs from the chain. "
    };
    var jewel6 = {
        image: "images/lariat.jpg",
        name: "Gold Plating Lariat Necklace",
        price: "₱ 559.99",
        description: "A lariat necklace is a long necklace, often reaching the navel or below, that can be worn in a variety of ways."
    };
    var jewel7 = {
        image: "images/station.jpg",
        name: "Diamond Shaker Station Necklace",
        price: "₱ 559.99",
        description: "A station necklace features multiple beads, pearls, or other gemstones spaced evenly along the chain."
    };
    var jewel8 = {
        image: "images/choker.jpg",
        name: "Celestial Princesscore Choker Necklace",
        price: "₱ 559.99",
        description: "A choker is a short necklace that fits snugly around the base of the neck. They can be thin and delicate or thick and statement-making."
    };

    var jewel9 = {
        image: "images/promisering.jpg",
        name: "White Gold Promise Ring",
        price: "₱ 559.99",
        description: "Promise rings can be any style, but they are often simpler and less expensive than engagement rings."
    };
    var jewel10 = {
        image: "images/stackingring.jpg",
        name: "Golden Stacking Ring Set",
        price: "₱ 559.99",
        description: "Stacking rings allow you to create a personalized look and add a touch of whimsy to your outfit."
    };
    var jewel11 = {
        image: "images/engagement ring.jpg",
        name: "Oval Diamond Solitaire Engagement Ring",
        price: "₱ 559.99",
        description: "Engagement rings are traditionally given by a person to their partner as a symbol of their commitment to getting married."
    };
    var jewel12 = {
        image: "images/statement ring.jpg",
        name: "24k Gold Statement Ring",
        price: "₱ 559.99",
        description: "They can be large and chunky, or they can be more delicate but still have a unique and eye-catching design."
    };

    var jewel13 = {
        image: "images/bangle.jpg",
        name: "18k Gold Celestial Cuff Bracelet",
        price: "₱ 559.99",
        description: "Similar to bangles, cuff bracelets are rigid but have an opening that allows you to slip them on your wrist."
    };
    var jewel14 = {
        image: "images/charm.jpg",
        name: "Gold Dragonfly Charm Bracelet ",
        price: "₱ 559.99",
        description: "These sentimental bracelets feature a chain with links or clasps that can be used to attach charms."
    };
    var jewel15 = {
        image: "images/tennis.jpg",
        name: "Diamond Tennis Bracelet",
        price: "₱ 559.99",
        description: "These delicate bracelets feature a row of diamonds or other gemstones set in a flexible metal setting."
    };
    var jewel16 = {
        image: "images/chain.jpg",
        name: "14k Gold Chain Link Bracelet",
        price: "₱ 559.99",
        description: "Link bracelets can be chunky or delicate, and they can be plain or adorned with charms or other embellishments."
    };

    var jewel17 = {
        image: "images/ankletchain.jpg",
        name: "Mira Gem Chain Anklet",
        price: "₱ 559.99",
        description: "They can be worn alone for a minimalist look or layered with other anklets for a more bohemian vibe."
    };
    var jewel18 = {
        image: "images/charmanklet.jpg",
        name: "Gold Daisy & Pearl Anklet",
        price: "₱ 559.99",
        description: "Similar to charm bracelets, charm anklets feature a chain with links or clasps that can be used to attach charms."
    };
    var jewel19 = {
        image: "images/seashell.jpg",
        name: "Gold Seashell Anklet",
        price: "₱ 559.99",
        description: "A perfect reminder of summer days at the beach, seashell anklets are made from natural seashells strung together on a thread or cord."
    };
    var jewel20 = {
        image: "images/cuffanklet.jpg",
        name: "Orb Cuff Anklet",
        price: "₱ 559.99",
        description: "Link bracelets can be chunky or delicate, and they can be plain or adorned with charms or other embellishments."
    };
    
    
    
    
    var currentQuant = document.getElementById("itemQuant").value;
    
    function decreaseQuant() {
        var quant = parseInt(currentQuant) - 1;
        if (quant >= 0) {
            document.getElementById("itemQuant").value = quant;
            currentQuant = quant;
        } else {
            document.getElementById("itemQuant").value = 0;
            currentQuant = 0;
        }
    }
    
    function increaseQuant() {
        var quant = parseInt(currentQuant) + 1;
        document.getElementById("itemQuant").value = quant;
        currentQuant = quant;
    }

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        var form = event.target;
        var formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                document.getElementById("successMessage").style.display = "block";
                document.getElementById("errorMessage").style.display = "none";
                form.reset();
            } else {
                throw new Error("Network response was not ok.");
            }
        }).catch(error => {
            document.getElementById("successMessage").style.display = "none";
            document.getElementById("errorMessage").style.display = "block";
        });
    });
    

function placeOrderClicked() {
    alert("Your order will be delivered on time");
    var cartContent = document.querySelector(".cart-content");
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
 
}


function removeCartItems(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
  
}

function display_success() {
    const full_name = document.getElementById("full_name").value;
    const mobile_num = document.getElementById("mobile_num").value;
    const address = document.getElementById("address").value;
    const pay_method = document.getElementById("pay_method").value;
    const name_on_card = document.getElementById("name_on_card").value;
    const card_num = document.getElementById("card_num").value;

    if (full_name.trim() == "" || mobile_num.trim() == "" || address.trim() == "") {
        alert("Please fill in all the required fields.");
    } else if (pay_method == "Card" && (name_on_card.trim() == "" || card_num.trim() == "")) {
        alert("Please provide valid card details.");
    } else {

        document.getElementById('display_success').classList.toggle("active");
        var popup = document.getElementById("place_order");
        popup.classList.remove("active");
    }
}

function successfully_ordered() {
    const displaySuccess = document.getElementById('display_success');
    displaySuccess.classList.remove('active');
    location.reload();
}

function back_to_cart() {
    const placeOrder = document.getElementById('place_order');
    placeOrder.classList.remove('active'); // Hide the place_order section
    document.getElementById('shopping_cart').classList.add('active'); // Show the shopping_cart section
}

// Initialize the cart on page load
document.addEventListener('DOMContentLoaded', update_cart);

function togglePlaceOrder() {
    var placeOrderSection = document.getElementById("place_order");
    placeOrderSection.classList.toggle("active");
}

function go_to_next(){
    var placeOrderElement = document.getElementById("place_order");
    var contentWrapper = document.querySelector ('.contact-content');
    placeOrderElement.classList.toggle("active");
    contentWrapper.classList.toggle("blurred");
}

function toggle_cardfields() {
    var paymentMethod = document.getElementById("pay_method").value;
    var nameOnCardRow = document.getElementById("name_on_card_row");
    var cardNumRow = document.getElementById("card_num_row");
    
    if (paymentMethod === "Card") {
        nameOnCardRow.style.display = "table-row";
        cardNumRow.style.display = "table-row";
    } else {
        nameOnCardRow.style.display = "none";
        cardNumRow.style.display = "none";
    }
}

function display_success() {
    alert("Order placed successfully! Thank you for purchasing.");
}
