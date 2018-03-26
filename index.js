var fs = require('fs');
var path = require('path');

var rs = {};

if (!fs.existsSync(path.resolve('./site/api/aot/pages')))
    fs.mkdirSync(path.resolve('./site/api/aot/pages'));
    
fs.readdirSync(path.resolve('./site/aot/pages')).forEach(collection => {
    var entries = fs.readdirSync(
        path.resolve(`./site/aot/pages/${collection}`)
    );
    rs[collection] = [];
    entries.forEach(e => {
        var eObj = {};
        eObj[e] = JSON.parse(fs.readFileSync(path.resolve(`./site/aot/pages/${collection}/${e}`), 'utf8'));
        rs[collection].push(eObj);
    });
    
    fs.writeFileSync(path.resolve(`./site/api/aot/pages/${collection}.json`), JSON.stringify(rs[collection], null, 2));
});

fs.readdirSync(path.resolve('./site/aot')).forEach(file => {
    if (file.endsWith(".json"))
        fs.copyFileSync(path.resolve(`./site/aot/${file}`), path.resolve(`./site/api/aot/${file}`));
});

fs.writeFileSync(path.resolve('./site/api/aot/pages/_all.json'), JSON.stringify(rs, null, 2));
