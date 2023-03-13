const HTMLParser = require('node-html-parser');
const axios = require('axios')
const {
  scrapPubRate,
  scrapOriginalTitle,
  scrapTitle,
  scrapCritRate,
  scrapDirector,
  scrapGenre,
  scrapProduction,
  scrapDuration,
  scrapYear,
  scrapShortDescription,
  scrapLongDescription,
  scrapMainActors,
  scrapCover
} = require('./scraps')

async function go(link){

  const axiosResponse = await axios.request({
    method: "GET",
    url: link,
  })

  const root = HTMLParser.parse(axiosResponse.data)

  const movie = {
    title: scrapTitle(root),
    originalTitle: scrapOriginalTitle(root),
    pubRate: scrapPubRate(root),
    critRate: scrapCritRate(root),
    directors: scrapDirector(root),
    genres: scrapGenre(root),
    productions: scrapProduction(root),
    duration: scrapDuration(root),
    year: scrapYear(root),
    shortDescription: scrapShortDescription(root),
    longDescription: scrapLongDescription(root),
    actors: scrapMainActors(root),
    cover: scrapCover(root),
    link: link
  }
  return movie
}

module.exports = {
  go
}