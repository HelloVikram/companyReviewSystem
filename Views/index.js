
async function postData(obj) {
    try {
        const response = await axios.post("http://localhost:3000/user/add-review", obj);
        console.log("data Posted successefully...", response);

    } catch (err) {
        console.log(err);
    }
}

const reviewform = document.getElementById('reviewform');
const Rating = document.getElementsByName('star');
reviewform.addEventListener('submit', (event) => {
    event.preventDefault();
    const Companyname = event.target.cname.value;
    const Pros = event.target.pros.value;
    const Cons = event.target.cons.value;
    let Ratingvalue;
    for (const rate of Rating) {
        if (rate.checked) {
            Ratingvalue = rate.value;
            break;
        }
    }
    const obj = { Companyname, Pros, Cons, Ratingvalue };
    postData(obj);
    event.target.cname.value="";
    event.target.pros.value="";
    event.target.cons.value="";
})

const searchform = document.querySelector('#searchform');
searchform.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.search.value.trim();
    async function getData() {
        try {
            const response = await axios.get(`http://localhost:3000/user/search/${name}`);

            showData(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    getData();
    event.target.search.value="";
})


function showData(obj){
   const ul=document.querySelector('ul');
   ul.innerHTML="";

   if (!obj || !obj.searchedcompany) {
    const noDataMessage = document.createElement('p');
    noDataMessage.textContent = "No company available.";
    ul.appendChild(noDataMessage);
    return
}
   
   const cname=document.createElement('h3');
   cname.textContent=`Company Name:${obj.searchedcompany}`;
   ul.appendChild(cname);

   const rating=document.createElement('p');
   rating.textContent=`${obj.avgrating}⭐`;
   ul.appendChild(rating);

   obj.reviews.forEach(review => {
    const li=document.createElement('li');
    li.innerHTML=`<strong>Pros:</strong>${review.Pros}<br>
    <strong>Cons:</strong>${review.Cons}<br>
    <strong>Rating:</strong>${review.Ratingvalue}`;
    ul.appendChild(li);
   });
   
}