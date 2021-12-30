require('dotenv').config();

// connect to the cloudinary node sdk
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'top-repair-kft', 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

// create a works array
let works = [];

// get the folder list from the works folder
cloudinary.api.sub_folders("works", {max_results: 500}, (error, result) => {
    // populate the works array with the folders list in the desired format
    result.folders.forEach(folder => {

        works.push({id: folder.name, media: []});

        // get each media element from the individual folders
        cloudinary.api.resources({
            type: 'upload',
            resource_type: 'image',
            prefix: `works/${folder.name}`,
            tags: true
        }, (error, result) => { 
            // populate every element in the works array with the media property in the desired format
            result.res
            works.find(work => work.id === folder.name).media.push({
                tags: result.tags,
                url: result.secure_url
            });


        });

        cloudinary.api.resources({
            type: 'upload',
            resource_type: 'video',
            prefix: `works/${folder.name}`,
            tags: true
        }, (error, result) => { 
            // populate every element in the works array with the media property in the desired format
            works.find(work => work.id === folder.name).media.push({
                tags: result.tags,
                url: result.secure_url
            });
        });
        
    });

});





// create a json file and save it to the data folder to cdn