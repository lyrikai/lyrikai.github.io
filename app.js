let filmName = document.getElementById("film-name")

let i = 0 

document.getElementById("submit").addEventListener('click', ()=>{

    fetch('http://www.omdbapi.com/?s=' + filmName.value +'&apikey=f6d4f5b')

    .then((response) => {
        return response.json();
    })
    .then((film) => {
        let max = film.Search.length
        let container = document.getElementById("container");

        const observer = new IntersectionObserver((entries) => {
            for(const entry of entries){
                console.log(entry.isIntersecting)
                if (entry.isIntersecting  && i < max - 1){
                    console.log(i)
                    
                    i = i + 1

                    let div = document.createElement("div");
                    div.setAttribute("class", "boxfilm");
                    div.setAttribute("id", 'boxfilm' + i);
                    container.appendChild(div);
                    
                    let box = document.getElementsByClassName("boxfilm");

                    let div2 = document.createElement("div");
                    div2.setAttribute("class", "bloc-img");
                    div.appendChild(div2);

                    let div3 = document.createElement("div");
                    div3.setAttribute("class", "bloc-txt");
                    div.appendChild(div3);

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

            ok = true
            button[i-1].addEventListener('click', myFunction)

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
            }
        });

        
        observer.observe(document.querySelector('#cool'))

    })
    .catch((error) => {
        console.error('Response error:', error.message);
    })

}) 

/*-------------*/
