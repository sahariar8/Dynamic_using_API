const category =async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data =await res.json();
    const categories =data.data;
    const container = document.getElementById('categories')
    categories.forEach(category =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="show(${category.category_id})"  class="tab hover:bg-red-400 rounded-lg md:text-lg bg-slate-300 md:mr-5 text-black mb-1 w-full md:w-3/4" id="cat"> ${category.category}</a>
        `;
        container.appendChild(div);
       
    })
   
}

let catId;
const show = async (categoryId)=>{
        catId = categoryId;
        console.log(catId)
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
        const data = await res.json();
        const details = data.data;
     
        // 
        const card = document.getElementById('card');
        card.innerHTML = "";
        // 
        const empty = document.getElementById('empty');
        empty.innerHTML ="";
        
// 
    if(details.length === 0){
        
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="flex justify-center">
                <img src="images/Icon.png">
            </div>
                <p class="text-lg md:text-3xl font-bold mt-3">Oops!! Sorry, There is no <br> content here</p>
        
            `;
       empty.appendChild(div);
    
    }else{
        details.forEach(detail =>{
            //time
            const time = detail.others.posted_date;
            const hour =Math.floor(time/3600);
            const minute =Math.floor((time%3600)/60);
            const final = hour + " hrs " + minute +" min ago";

            //
            const div = document.createElement('div');

            //include
            div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow-xl">
            <div class="relative">
                <figure><img src="${detail.thumbnail}" alt="Shoes" / class="h-60 w-full"></figure>
                <div class="absolute bottom-3 right-3">
                    <p class="inline-block bg-slate-800 text-white p-2 rounded-lg">${time?final:""}</p>
                </div>
           </div>
            <div class="card-body">
                <div class="flex">
                    <div class="w-1/6">
                    <img class="rounded-full w-9 h-9" src="${detail?.authors[0]?.profile_picture}" alt="profile picture">
                    </div>
                    <div class="w-5/6 ">
                        <p class="text-lg font-semibold">${detail.title}</p>
                        <div class="flex flex-row gap-2">
                            <div>
                                <p class="text-sm text-slate-500 inline-block">${detail?.authors[0]?.profile_name}</p>
                            </div>
                            <div>
                                <p>${detail?.authors[0]?.verified?"<img src='images/icons8-verified-badge-24.png'>":""}</p>
                            </div>
                       </div>
                        <p class="text-sm text-slate-500" >${detail?.others?.views} views</p>

                    </div>
                </div>
              
            </div>
        </div>`;

         card.appendChild(div);
        //  publishedDate(`${detail?.others?.posted_date}`);
       })   
    }  
   
}

const sort =async () => {
    //
    const cat = document.getElementById("cat");
    console.log(cat);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catId}`);
    const data = await res.json();
    const details = data.data;
    
    const sortDetails = details.sort((a,b)=>parseFloat(b.others.views) - parseFloat(a.others.views));
    console.log(sortDetails);
 
    const card = document.getElementById('card');
    card.innerHTML = "";
    sortDetails.forEach(detail =>{
        const div = document.createElement('div');
        //
        const time = detail.others.posted_date;
        const hour =Math.floor(time/3600);
        const minute =Math.floor((time%3600)/60);
        const final = hour + " hrs " + minute +" min ago";

        div.innerHTML =`
        <div class="card card-compact bg-base-100 shadow-xl">
        <div class="relative">
            <figure><img src="${detail.thumbnail}" alt="Shoes" / class="h-60 w-full"></figure>
            <div class="absolute bottom-3 right-3">
                <p class="inline-block bg-slate-800 text-white p-2 rounded-lg">${time?final:""}</p>
            </div>
       </div>
        <div class="card-body">
            <div class="flex">
                <div class="w-1/6">
                <img class="rounded-full w-9 h-9" src="${detail?.authors[0]?.profile_picture}" alt="profile picture">
                </div>
                <div class="w-5/6 ">
                    <p class="text-lg font-semibold">${detail.title}</p>
                    <div class="flex flex-row gap-2">
                        <div>
                            <p class="text-sm text-slate-500 inline-block">${detail?.authors[0]?.profile_name}</p>
                        </div>
                        <div>
                            <p>${detail?.authors[0]?.verified?"<img src='images/icons8-verified-badge-24.png'>":""}</p>
                        </div>
                   </div>
                    <p class="text-sm text-slate-500" >${detail?.others?.views} views</p>

                </div>
            </div>
          
        </div>
    </div>`;

     card.appendChild(div);

    })
}


show("1000")
category();




