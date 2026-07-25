function calculateHealthScore
({
    title,
    metaDescription,
    h1Count,
    imagesMissingAlt
}){
    let score = 100;
    if(!title) score -=15;
    if(!metaDescription) score -=15;
    if(h1Count===0) score -=10;

    score-=imagesMissingAlt*5;

    return Math.max(score,0);


}
module.exports = {calculateHealthScore};