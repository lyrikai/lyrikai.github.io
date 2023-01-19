let filmName = document.getElementById("film-name")

let i = 0 

document.getElementById("submit").addEventListener('click', ()=>{

    fetch('https://www.omdbapi.com/?s=' + filmName.value +'&apikey=f6d4f5b')

    .then((response) => {
        return response.json();
    })
    .then((film) => {
        let max = film.Search.length
        let container = document.getElementById("container");

        const observer = new IntersectionObserver((entries) => {
            for(const entry of entries){
                console.log(entry.isIntersecting)
                if(entry.isIntersecting  && i >= max - 1){
                    let marge = document.getElementById("container")
                    marge.style.marginBottom = "20vh"
                }else if(entry.isIntersecting  && i < max - 1){
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
                    btn.innerHTML = "Read more";
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
                        let test = this.parentNode
                        let test2 = test.parentNode
                        let test3 = test2.getElementsByTagName('div')[0]
                        let test4

                        if(test3.getElementsByTagName('img')[0]){
                        test4 = test3.getElementsByTagName('img')[0].src
                        }
                        
                        let p = test.getElementsByTagName('p')[0].textContent
                        let p2 = test.getElementsByTagName('p')[1].textContent
                        document.body.style.overflow = "hidden";
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                        centerBlock.style.display = "flex"
                        readtitle.innerHTML = p
                        readdate.innerHTML = p2
                        if(test4){
                            readimg.src = test4
                        }
                    
                        readplot.innerHTML = plott
                        test4 = 0
                    }

                    ok = true
                    button[i-1].addEventListener('click', myFunction)

                    let plott
                    fetch(`https://www.omdbapi.com/?t=` + film.Search[i].Title +'&apikey=f6d4f5b')
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

