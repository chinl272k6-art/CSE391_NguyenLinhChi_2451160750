const gallery =
    document.getElementById("gallery");

const loading =
    document.getElementById("loading");

const trigger =
    document.getElementById("load-trigger");

const lightbox =
    document.getElementById("lightbox");

const lightboxImg =
    document.getElementById("lightboxImg");

const closeBtn =
    document.getElementById("closeBtn");


let page = 1;

let isLoading = false;


// ======================================
// Fetch photos
// ======================================

async function loadMorePhotos(){

    if(isLoading) return;

    isLoading = true;

    loading.style.display = "block";

    try{

        const response = await fetch(
            `https://picsum.photos/v2/list?page=${page}&limit=20`
        );

        if(!response.ok){
            throw new Error("Failed to load photos");
        }

        const photos = await response.json();

        renderPhotos(photos);

        page++;

    }
    catch(error){

        alert(error.message);

    }
    finally{

        loading.style.display = "none";

        isLoading = false;

    }

}


// ======================================
// Render photos
// ======================================

function renderPhotos(photos){

    photos.forEach(photo => {

        const div =
            document.createElement("div");

        div.className = "photo";

        div.innerHTML = `
            <img
                data-src="${photo.download_url}"
                alt="${photo.author}"
            >
        `;

        gallery.appendChild(div);

    });

    lazyLoadImages();

}


// ======================================
// Lazy loading images
// ======================================

function lazyLoadImages(){

    const images =
        document.querySelectorAll("img[data-src]");

    const imageObserver =
        new IntersectionObserver((entries,observer) => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    const img = entry.target;

                    img.src = img.dataset.src;

                    img.removeAttribute("data-src");

                    // click mở lightbox
                    img.addEventListener("click", () => {

                        openLightbox(img.src);

                    });

                    observer.unobserve(img);

                }

            });

        });

    images.forEach(img => {

        imageObserver.observe(img);

    });

}


// ======================================
// Infinite scroll observer
// ======================================

const observer =
    new IntersectionObserver((entries) => {

        if(entries[0].isIntersecting){

            loadMorePhotos();

        }

    });

observer.observe(trigger);


// ======================================
// Lightbox
// ======================================

function openLightbox(src){

    lightbox.classList.remove("hidden");

    lightboxImg.src = src;

}

closeBtn.addEventListener("click", () => {

    lightbox.classList.add("hidden");

});


// click nền để đóng
lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){

        lightbox.classList.add("hidden");

    }

});


// ======================================
// Load first photos
// ======================================

loadMorePhotos();