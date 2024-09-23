const buttons = document.querySelectorAll('ul button');
buttons.forEach(button => {
    button.addEventListener('click', async (event) => {
        try {
            // Get the filename from the clicked button's id
            const filename = event.target.id;
    
            // Read the file from URL
            const inputArray = await readFromUrl(filename);
    
            iterateOverArray(inputArray);
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

async function readFromUrl(filename) {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/geetsswain/study-resources-links/refs/heads/main/${filename}.txt`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

        return lines;
    } catch (error) {
        console.error('Error reading from URL:', error);
        throw error;
    }
}

const iterateOverArray = inputArray => {
    let html = ''

    inputArray.forEach(item => {
        html +=`<div class="col-md-3 col-sm-6 col-xs-12 mb-4">`
        html +=    `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${item}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">`
        html +=        `<div style="padding:16px;">`
        html +=            `<a href="${item}" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none;" target="_blank"></a>`
        html +=        `</div>`
        html +=    `</blockquote>`
        html +=`</div>`
    });

    document.querySelector('.row').innerHTML = html
    window.instgrm.Embeds.process();
}
