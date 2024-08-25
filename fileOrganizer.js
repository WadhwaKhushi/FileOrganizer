let fs = require("fs");
let path = require("path");

let folderpath = process.argv[2];
console.log(folderpath) // gives path

let folderexists = fs.existsSync(folderpath);

let extensions = {
    Audio:[".mp3"],
    Video:[".mp4",".mkv",".gif"],
    Document:[".doc",".xlsx",".pdf",".txt"],
    Image:[".jpg",".jpeg",".png"],
    Software:[".exe"]
}
function giveFolderName(ext){
    for(let key in extensions){
        let extArr = extensions[key];
        for(let i =0;i<extArr.length;i++){
            if(extArr[i]==ext){
                return key;
            }
        }
    }
    return 'Others';
}

if(folderexists){
    //code
    let files = fs.readdirSync(folderpath);
    for(let i=0;i<files.length;i++){
        let ext = path.extname(files[i]); 
        let nameofFolder = giveFolderName(ext);     
        console.log("Extension--",ext,"Folder--",nameofFolder); 
        let pathofFolder = path.join(folderpath,nameofFolder); 
        let exist = fs.existsSync(pathofFolder);
        if(exist){
            moveFile(folderpath,pathofFolder,files[i]);
        }else {
            fs.mkdirSync(pathofFolder);
            moveFile(folderpath,pathofFolder,files[i]);
        }
    }
    // console.log(files);
}
else{
    console.log("Please enter a valid PATH!!");
}

function moveFile(folderpath,pathofFolder,fileName){
    let sourcePath = path.join(folderpath,fileName);
    let destPath = path.join(pathofFolder,fileName);
    fs.copyFileSync(sourcePath,destPath);
    fs.unlinkSync(sourcePath);
}