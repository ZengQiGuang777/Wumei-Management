const express = require('express'),
	bodyparser = require('body-parser'),
	fs = require('fs').promises,
	path = require('path');
const pathdb = path.resolve(__dirname, 'database'),
	config = require('./package.json').config,
	server = config.server,
	{ open, safeList } = config.cros,
	{ filter, responsePublic } = require('./utils');

/*-创建&启动服务-*/
const app = express();
app.listen(server, () => {
	console.log(`THE WEB SERVICE SUCCESSFULLY AND LISTENING TO THE PORT：${server}!`);
});

/*-中间件-*/
if (open) {
	app.use((req, res, next) => {
		let origin = req.headers.origin || req.headers.referer || "";
		origin = origin.replace(/\/$/g, '');
		origin = !safeList.includes(origin) ? '' : origin;
		res.header("Access-Control-Allow-Origin", origin);
		res.header("Access-Control-Allow-Methods", 'GET,POST,DELETE,HEAD,OPTIONS,PATCH,PUT');
		res.header("Access-Control-Allow-Headers", 'DNT,authorzation,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-token');
		res.header("Access-Control-Allow-Credentials", true);
		req.method === 'OPTIONS' ? res.send() : next();
	});
}
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(async (req, _, next) => {
	req.$BAR_DATA = filter(await fs.readFile(`${pathdb}/bar.json`, 'utf-8'));
	req.$PIE_DATA = filter(await fs.readFile(`${pathdb}/pie.json`, 'utf-8'));
	req.$RANKING_DATA = filter(await fs.readFile(`${pathdb}/ranking.json`, 'utf-8'));
	req.$TREND_DATA = filter(await fs.readFile(`${pathdb}/trend.json`, 'utf-8'));
	next();
});

/*-接口管理-*/
app.get('/statistics/bar', async (req, res) => {
	responsePublic(res, true, {
		data: req.$BAR_DATA
	});
});
app.get('/statistics/pie', async (req, res) => {
	responsePublic(res, true, {
		data: req.$PIE_DATA
	});
});
app.get('/statistics/trend', async (req, res) => {
	responsePublic(res, true, {
		data: req.$TREND_DATA
	});
});
app.get('/statistics/ranking', async (req, res) => {
	responsePublic(res, true, {
		data: req.$RANKING_DATA
	});
});

app.post('/update/active', async (req, res) => {
	let $PIE_DATA = req.$PIE_DATA,
		{ type = 'active', num = 1 } = req.body;
	num = +num;
	if (type === 'active') {
		$PIE_DATA.active += num;
	} else {
		$PIE_DATA.unactive += num;
	}
	try {
		await fs.writeFile(`${pathdb}/pie.json`, JSON.stringify($PIE_DATA), 'utf-8');
		responsePublic(res, true, {
			data: $PIE_DATA
		});
	} catch (_) {
		responsePublic(res, false);
	}
});

/*-静态页面&404-*/
app.use(express.static('./static'));
app.use((_, res) => {
	res.status(404);
	res.send();
});