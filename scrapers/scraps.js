const he = require('he')

function scrapPubRate(root){
  const item = root.getElementsByTagName("span").find(span => span.attributes.class === "filmRating__rateValue")
  console.log(item.childNodes[0].rawText)
  const pubRate = item.childNodes[0].rawText
  return pubRate
}

function scrapCritRate(root){
  const item = root.getElementsByTagName("span").findLast(span => span.attributes.class === "filmRating__rateValue")
  console.log(item.childNodes[0].rawText)
  const critRate = item.childNodes[0].rawText
  return critRate
}

function scrapTitle(root){
  const item = root.getElementsByTagName("h1").find(h1 => h1.attributes.class.includes("filmCoverSection__title"))
  const toDecode = item.childNodes[0].rawText
  console.log(he.decode(toDecode))
  const title = he.decode(toDecode)
  return title
}

function scrapOriginalTitle(root){
  const item = root.getElementsByTagName("div").find(div => div.attributes.class === "filmCoverSection__originalTitle")
  let originalTitle = ''
  if(item){
    const toDecode = item.childNodes[0].rawText
    console.log(he.decode(toDecode))
    originalTitle = he.decode(toDecode)
  } else {
    originalTitle = '-'
  }
  return originalTitle
}

function scrapDirector(root){
  const item = root.getElementsByTagName("div").find(div => div.attributes.class === "filmInfo__info cloneToCast cloneToOtherInfo")
  table = item.childNodes
  const directors = []
  table.forEach(element => {
    if(element.rawTagName === 'a'){
      const toDecode = element.rawText
      console.log(he.decode(toDecode))
      const name = he.decode(toDecode)
      const linkToDecode = element.childNodes[0]._rawAttrs.content
      console.log(he.decode(linkToDecode))
      const link = he.decode(linkToDecode)
      const director = {
        name: name,
        link: link
      }
      directors.push(director)
    }
  })
  return directors
}

function scrapDuration(root){
  const item = root.getElementsByTagName("div").find(div => div.attributes.class === "filmCoverSection__duration")
  const toDecode = item.childNodes[0].rawText
  console.log(he.decode(toDecode))
  const duration = he.decode(toDecode)
  return duration
}

function scrapYear(root){
  const item = root.getElementsByTagName("div").find(div => div.attributes.class === "filmCoverSection__year")
  const toDecode = item.childNodes[0].rawText
  console.log(he.decode(toDecode))
  const year = he.decode(toDecode)
  return year
}

function scrapGenre(root){
  const item = root.getElementsByTagName("div").find(div => div.attributes.class === "filmInfo__info" && div.attributes.itemprop === "genre")
  table = item.childNodes
  const genre = []
  table.forEach(element => {
    if(element.rawTagName === 'span' ){
      element.childNodes.forEach(item => {
        if(item.rawTagName){
          console.log(item.rawText)
          const toDecode = item.rawText
          genre.push(he.decode(toDecode))
        }
      })
    }
  })
  return genre
}

function scrapProduction(root){
  const item = root.getElementsByTagName("div").find(div => div.attributes.class === "filmInfo__info" && div.attributes.itemprop !== "genre")
  table = item.childNodes
  const productions = []
  table.forEach(element => {
    if(element.rawTagName === 'span' ){
      element.childNodes.forEach(item => {
        if(item.rawTagName){
          console.log(item.rawText)
          const toDecode = item.rawText
          productions.push(he.decode(toDecode))
        }
      })
    }
  })
  return productions
}

function scrapShortDescription(root){
  const item = root.getElementsByTagName("div").find(div => div.attributes.class && div.attributes.class.includes("filmPosterSection__plot"))
  table = item.childNodes
  let shortDescription = ''
  table.forEach(element => {
    if(element.attributes && element.attributes.itemprop === 'description'){
      const toDecode = element.rawText
      console.log(he.decode(toDecode))
      shortDescription = he.decode(toDecode)
    }
  })
  return shortDescription
}

function scrapLongDescription(root){
  let item = root.getElementsByTagName("p").find(p => p.attributes.class && p.attributes.class.includes("descriptionSection__text"))
  let longDescription = ''
  if(item.childNodes.length === 1){
    const toDecode = item.rawText
    longDescription = he.decode(toDecode)
  } else {
    item = root.getElementsByTagName("span").find(span => span.attributes.class && span.attributes.class.includes("descriptionSection__moreText"))
    
    if(item !== undefined){
      const toDecode = item.rawText
      console.log(he.decode(toDecode))
      longDescription = he.decode(toDecode)
    } else {
      longDescription = '-'
    }
  }
  return longDescription
}

function scrapMainActors(root){
  const item = root.getElementsByTagName("h3").filter(h3 => h3.attributes.class && h3.attributes.class.includes("simplePoster__heading") && h3.attributes.itemprop === 'name')
  const mainActors = []
  item.forEach(element => {
    console.log(element.rawText)
    const toDecode = element.rawText
    mainActors.push(he.decode(toDecode))
  })
  return mainActors
}

function scrapCover(root){
  const item = root.getElementsByTagName("a").find(a => a.attributes.class && a.attributes.class.includes("filmPosterSection__link"))
  const table = item.childNodes
  let cover = ''
  table.forEach(element => {
    if(element.rawTagName === 'img'){
      console.log(element.attributes.src)
      cover = element.attributes.src
    }
  })
  return cover
}

module.exports = {
  scrapPubRate,
  scrapCritRate,
  scrapTitle,
  scrapOriginalTitle,
  scrapDirector,
  scrapGenre,
  scrapProduction,
  scrapDuration,
  scrapYear,
  scrapShortDescription,
  scrapLongDescription,
  scrapMainActors,
  scrapCover
}