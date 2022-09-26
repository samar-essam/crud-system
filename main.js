var productNameInput=document.getElementById("productName");
var productPriceInput=document.getElementById("productPrice");
var productCategoryInput=document.getElementById("productCategory");
var productDescInput=document.getElementById("productDesc");
var supmitBtn = document.getElementById("mainproduct")
var searchInput = document.getElementById("search");
var nameAlert = document.getElementById("nameAlert");
var priceAlert = document.getElementById("priceAlert");
var categoryAlert = document.getElementById("categoryAlert");
var DescAlert = document.getElementById("DescAlert");
var productContainer=[];
var currentIndex=0;

productNameInput.onkeyup = function f1 (){
    var nameRegx = /^[A-Z][a-z]{2,8}$/;
  
    if(!nameRegx.test(productNameInput.value))
    {
        supmitBtn.disabled="true"; 
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid")
        nameAlert.classList.remove("d-none");
        return false;
    }
    else
    {
        supmitBtn.removeAttribute("disabled");
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid")
        nameAlert.classList.add("d-none");
        return true;
    }
}
productPriceInput.onkeyup = f2= function (){
    var priceRegex = /(^[1-5][0-9][0-9]$|600$)$/;
    if(!priceRegex.test(productPriceInput.value))
    {
        supmitBtn.disabled="true"; 
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid")
        priceAlert.classList.remove("d-none");
        return false;
    }
    else
    {
        supmitBtn.removeAttribute("disabled");
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid")
        priceAlert.classList.add("d-none");
        return true;
    }

    
}

productCategoryInput.onkeyup = function f3(){
    var categoryRegex = /^good|bad|Good|Bad$/;
    if(!categoryRegex.test(productCategoryInput.value))
    {
        supmitBtn.disabled="true"; 
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid")
        categoryAlert.classList.remove("d-none");
        return false;
    }
    else
    {
        supmitBtn.removeAttribute("disabled");
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid")
        categoryAlert.classList.add("d-none");
        return true;
    }

}
productDescInput.onkeyup = function f4(){
    var descRegex = /^[a-z ]{2,}$/;
    if(!descRegex.test(productDescInput.value))
    {
        supmitBtn.disabled="true"; 
        productDescInput.classList.add("is-invalid");
        productDescInput.classList.remove("is-valid")
        DescAlert.classList.remove("d-none");
        return false;
    }
    else
    {
        supmitBtn.removeAttribute("disabled");
        productDescInput.classList.add("is-valid");
        productDescInput.classList.remove("is-invalid")
        DescAlert.classList.add("d-none");
        return true;
    }
}
function validation(){
    if(productNameInput.value!="" && productPriceInput.value!="" && productCategoryInput.value!="" && productDescInput.value!="")
    {
        return true;

    }
    else
    {
        return false;
    }

}


if (localStorage.getItem("ourProducts")!=null)
{
    productContainer=JSON.parse(localStorage.getItem("ourProducts"));
    displayProduct();
}

supmitBtn.onclick=function () {
    if(supmitBtn.innerHTML=="add Product")
    {
        addProduct();
    }
    else
    {
        updateProduct();
    }
}



function addProduct(index) {
 
    if(validation()){
        var product =
        {
            Name: productNameInput.value,
            price: productPriceInput.value,
            Caterogy:productCategoryInput.value,
            Desc:productDescInput.value
        }
        productContainer.push(product);
        localStorage.setItem("ourProducts" , JSON.stringify(productContainer));
        // console.log(productContainer);
        displayProduct();
        clearform();
    }
    else
    {
        supmitBtn.disabled="true";
    }

     
    
}

function clearform()
{
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";
}

function displayProduct()
{
    var cartoona ="";
    for(var i=0;i<productContainer.length;i++)
    {
        cartoona += `<tr>
        <td> ${i}</td>
        <td>${productContainer[i].Name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].Caterogy}</td>
        <td>${productContainer[i].Desc}</td>
        <td><button onclick=" getProductInfo(${i})"  class="btn btn-outline-info">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById("tablebody").innerHTML=cartoona;
}
 function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("ourProducts" , JSON.stringify(productContainer));
    displayProduct();
 }


searchInput.onkeyup = function()
{
    var term = this.value;
    var cartoona ="";
    for(var i=0; i<productContainer.length;i++)
    {
        if(productContainer[i].Name.toLowerCase().includes(term.toLowerCase())==true)
        {
            cartoona += `<tr>
            <td> ${i}</td>
            <td>${productContainer[i].Name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].Caterogy}</td>
            <td>${productContainer[i].Desc}</td>
            <td><button class="btn btn-outline-info">Update</button></td>
            <td><button class="btn btn-outline-danger">Delete</button></td>
        </tr>`
        }
    }
    document.getElementById("tablebody").innerHTML=cartoona;
}



function getProductInfo(index)
{
    productNameInput.value = productContainer[index].Name;
    productPriceInput.value = productContainer[index].price
    productCategoryInput.value = productContainer[index].Caterogy;
    productDescInput.value = productContainer[index].Desc;
    document.getElementById("mainproduct").innerHTML="Update Product";
    currentIndex=index;
   
}


function updateProduct() {
    var product =
    {
        Name: productNameInput.value,
        price: productPriceInput.value,
        Caterogy:productCategoryInput.value,
        Desc:productDescInput.value
    }
    
    productContainer[currentIndex] = product;
    localStorage.setItem("ourProducts" , JSON.stringify(productContainer));
    displayProduct();
    clearform();
}




