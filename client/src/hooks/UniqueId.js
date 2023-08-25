export const uniqueId = ()=>{
    const arrId = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];
    const randNum1 = Math.floor(Math.random()*26+1);
    const randNum2 = Math.floor(Math.random()*26+1);
    const randNum3 = Math.floor(Math.random()*26+1);
    const randNum4 = Math.floor(Math.random()*26+1);
    const randNum5 = Math.floor(Math.random()*26+1);
    
    const id = arrId[randNum1]+arrId[randNum2]+arrId[randNum3]+arrId[randNum4]+arrId[randNum5]
    return id;
}