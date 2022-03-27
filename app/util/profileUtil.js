


export function getProfile(){
    pic_arr = ["https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fcat1.png?alt=media&token=7b720076-437a-4724-8bd2-fc5c5821bc6a",
               "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fcat2.jpg?alt=media&token=14b5d683-8395-40a9-a664-2cb47e14ca24",
               "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fcat3.jpg?alt=media&token=edb325ba-24c2-495f-8731-67e224e6f189",
               "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fcat4.jpg?alt=media&token=0e267d74-2d0d-4bfb-be9d-15deb69e8e0b",
               "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fin-cat_in_glasses.jpg?alt=media&token=f40e3cbf-b3e1-47c1-8115-3e5958e3080c"]
    let index = Math.floor(Math.random() * 5)
    return pic_arr[index]
}

export function getBackground(){
    background = ["https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fbg1.jpeg?alt=media&token=2a858805-18ac-4d01-b835-a998d11a3553",
                  "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fbg2.jpg?alt=media&token=01b13077-e098-4806-ac89-23e2d420d791",
                  "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fbg3.jpg?alt=media&token=e4149e1f-792c-4ac8-9af0-3d8d4cbcfb96",
                  "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fbg4.jpg?alt=media&token=b865d742-c245-490b-b984-9ba9906761df",
                  "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/images%2Fbg5.jpg?alt=media&token=c980ef57-5278-4dcd-b84a-dcdc9a1ed618",]
    let index = Math.floor(Math.random() * 5)
    return background[index]
}