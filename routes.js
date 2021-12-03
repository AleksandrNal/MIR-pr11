const { Router } = require("express");
let ParserRSS = require("rss-parser");
const News = require("./models/News");

class StoreNews {
  constructor(RSS) {
    this.RSS = RSS.items;
  }

  toString() {
    var res = "";
    console.log("item");
    this.RSS.map((item) => {
      res += `Заголовок: ${item.title} Дата: ${item.pubDate} Ссылка на картинку: ${item.enclosure.url} Содержание: ${item.content}\n`;
    });
    return res;
  }

  saveToBD() {
    this.RSS.map((item) => {
      try {
        var toBD = new News({
          title: item.title,
          date: new Date(item.pubDate),
          image: item.enclosure.url,
          content: item.content,
        });
        toBD.save();
      } catch (e) {}
    });
  }
}

const router = Router();

router.post("/getNews", async (req, res) => {
  try {
    let parser = new ParserRSS();
    RSS = await parser.parseURL("https://1prime.ru/export/rss2/index.xml");
    let news = new StoreNews(RSS);
    await news.saveToBD();
    res.status(201).json(news.RSS);
  } catch (e) {
    res.status(201).json({ message: e.message });
  }
});

module.exports = router;
