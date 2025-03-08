    burger = document.querySelector('.burger')
    navbarHid = document.querySelector('.navbarHid')
    rightNavHid = document.querySelector('.rightNavHid')

    burger.addEventListener('click', ()=> {
        navbarHid.classList.toggle('c-class');
        rightNavHid.classList.toggle('c-class');
    })

    //add data to local storage
    let num = 0;
    const btn = document.getElementsByClassName('btn');
    let items = [];
    for(let i=0; i<btn.length; i++) {
        btn[i].addEventListener("click", function(e) {
            alert('Item added to cart');
            if(typeof(Storage) !== 'undefined'){
                let cart = {
                    id : i+1,
                    name:e.target.parentElement.children[1].textContent,
                    price:e.target.parentElement.children[4].textContent,
                    no:1
                };
                
                if (JSON.parse(localStorage.getItem('items')) === null){
                    items.push(cart);
                    localStorage.setItem("items",JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem("items"));
                    localItems.map(data=>{
                        if(cart.id == data.id){
                            cart.no = data.no + 1;
                        } else{
                            items.push(data);
                        }
                        
                    });
                    items.push(cart);
                    localStorage.setItem('items',JSON.stringify(items));
                    window.location.reload();
                }
            } 
        });
    }


    //add cartbox data in table
    const box = document.querySelector('.box');
    const cartBoxTable = box.querySelector('table');
    let tableData = '';

    tableData += '<tr><th>Sl No.</th><th>Product</th><th>Price</th></tr>';
   /* if(JSON.parse(localStorage.getItem('items')) === null){
        tableData += '<tr><td colspan="5"> </td></tr>';
    } else {*/
        
        JSON.parse(localStorage.getItem('items')).map(data=>{
            num = num+1;
            tableData += '<tr><th>' + num +'</th><th>' + data.name + '</th><th>' + data.price + '</th><th><a href="#" onclick=Delete(this);>Remove</a></th></tr>';
       
        });
        
        function Delete(e) {
            let items = [];
            JSON.parse(localStorage.getItem('items')).map(data=> {
                if(data.id != e.parentElement.parentElement.children[0].textContent) {
                    items.push(data);
                    
                }
            });
            localStorage.setItem('items',JSON.stringify(items));
            window.location.reload();
           
        };
    //}
    
    cartBoxTable.innerHTML = tableData;

    const HalP = document.querySelector('.Hal p');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(data=> {
no = no+data.no;
    });
    HalP.innerHTML = no;