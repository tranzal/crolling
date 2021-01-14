const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = 4000;
const app = express();

app.use(cors());

const getHtml = async () => {
    try {
        return await axios.get("https://movie.naver.com/movie/running/current.nhn");
        // 해당 사이트 html 태그 가져오기
    } catch (error) {
        console.error(error);
    }
};

const getRank = async () => {
    let date = new Date();
    let today = date.getFullYear()+(date.getMonth()+1)+(date.getDate()-1);
    try {
        return await axios.get(`https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=cnt&date=20210113`);
        // 해당 사이트 html 태그 가져오기
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    getHtml()
        .then((html) => {
            const $ = cheerio.load(html.data);
            let parentTag = $("div.article div.lst_wrap dl.lst_dsc");
            let resultArr = [];
            parentTag.each(function (i, elem) {
                resultArr[i] = {
                    title: $(this).find('dt.tit a').text(),
                    titleURL: $(this).find("dt.tit a").attr('href'),
                    gerne:$(this).find("dd dl.info_txt1 dd span.link_txt a").text()
                };
            });
            return resultArr;
        })
        .then((data) => res.send(data));
});

app.get("/rank", (req, res) => {
    getRank()
        .then((html) => {
            const $ = cheerio.load(html.data);
            let parentTag = $("div.article div.old_layout div.type_1 table.list_ranking tbody").children('tr');
            let resultArr = [];
            parentTag.each(function (i, elem) {
                resultArr[i] = {
                    rankURL: $(this).find('td.ac img').attr('src'),
                    titleURL: $(this).find("td.title div.tit3 a").attr('href'),
                    title:$(this).find("td.title div.tit3 a").text()
                };
            });
             return resultArr;
        })
        .then((data) => res.send(data));
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);