let filmName = document.getElementById("film-name")

document.getElementById("submit").addEventListener('click', ()=>{

    const observer = new IntersectionObserver((entries) => {
        for(const entry of entries){
            console.log(entry.isIntersecting)
            if (entry.isIntersecting){
                fetch('http://www.omdbapi.com/?s=' + filmName.value +'&apikey=f6d4f5b')

    .then((response) => {
        return response.json();
    })
    .then((film) => {
        console.log(film)

        let container = document.getElementById("container");

        for (let i = 0; i < film.Search.length; i++) {  
                   
            let div = document.createElement("div");
            div.setAttribute("class", "boxfilm");
            div.setAttribute("id", 'boxfilm' + i);
            
            if( i < 1){
                div.setAttribute("class", 'display-block boxfilm');
            }else{
                div.setAttribute("class", 'display-block boxfilm');
            }

            container.appendChild(div);
            let box = document.getElementsByClassName("boxfilm");

            let div2 = document.createElement("div");
            div2.setAttribute("class", "bloc-img");
            box[i].appendChild(div2);

            let div3 = document.createElement("div");
            div3.setAttribute("class", "bloc-txt");
            box[i].appendChild(div3);

            if (film.Search[i].Poster != "N/A"){
                let img = document.createElement("img");
                img.src = film.Search[i].Poster;
                div2.appendChild(img);
            }

            let p = document.createElement("p");
            p.innerHTML = film.Search[i].Title;
            div3.appendChild(p);

            let d = document.createElement("p");
            d.innerHTML = film.Search[i].Year;
            div3.appendChild(d);

            let btn = document.createElement("div");
            btn.setAttribute("class", "readmore");
            btn.innerHTML = "read more";
            div3.appendChild(btn);

            let button = document.getElementsByClassName("readmore")
            let plot = document.getElementsByClassName("plot")
            document.getElementById("close").addEventListener('click', ()=>{
                document.body.style.overflow = "visible";
                centerBlock.style.display = "none"
            });

    

            let centerBlock = document.getElementById("center-block")
            let readtitle = document.getElementById("readtitle")
            let readdate = document.getElementById("readdate")
            let readplot = document.getElementById("readplot")
            let readimg = document.getElementById("readimg")
            function myFunction() {
                document.body.style.overflow = "hidden";
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                centerBlock.style.display = "block"
                readtitle.innerHTML = film.Search[i].Title
                readdate.innerHTML = film.Search[i].Year
                readimg.src = film.Search[i].Poster
                readplot.innerHTML = plott
            }


            button[i].addEventListener('click', myFunction)

            let plott
            fetch(`http://www.omdbapi.com/?t=` + film.Search[i].Title +'&apikey=f6d4f5b')
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    plott = response.Plot
                    let desc = document.createElement("p");
                    desc.innerHTML = response.Plot;
                    desc.setAttribute("class", "plot");
                    box[i].appendChild(desc);
                })
                .catch((error) => {
                    console.error('Response error:', error.message);
            });
          
        }

    })
    .catch((error) => {
        console.error('Response error:', error.message);
    })

                
                
            }
        }
 

    });

    observer.observe(document.querySelector('#cool'))

    
}) 

/*-------------*/
